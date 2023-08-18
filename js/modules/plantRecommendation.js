import plantConfig from "./config.js";
import { soilConfig, potConfig, colorConfig } from "./plantDetails.js";

export function getPlantRecommendation() {
  const form = document.getElementById("plantForm");
  const formData = new FormData(form);

  const placement = formData.get("placement");
  const sunlight = formData.get("sunlight");
  const pets = formData.get("pets");
  const watering = formData.get("watering");
  const style = formData.get("style");
  const extras = formData.getAll("extra_elements");

  let category;
  let toxicity;
  if (placement === "inside_indirect" && sunlight === "no" && pets === "no") {
    category = "low_light_plants";
    toxicity = "toxic";
  } else if (
    placement === "inside_indirect" &&
    sunlight === "no" &&
    pets === "yes"
  ) {
    category = "low_light_plants";
    toxicity = "non_toxic";
  } else if (placement === "inside_indirect" && sunlight === "yes") {
    category = "medium_light_plants";
    toxicity = "non_toxic";
  } else if (placement === "inside_direct") {
    category = "medium_light_plants";
    toxicity = "toxic";
  } else if (placement === "outside") {
    category = "outdoor_plants";
    toxicity = "toxic";
  }

  if (category && toxicity) {
    const recommendation = selectPlantByCategoryAndToxicity(
      category,
      toxicity,
      watering,
      style,
      extras,
      sunlight
    );

    if (recommendation) {
      storeRecommendation(recommendation);
      displayRecommendation(recommendation, sunlight);
    }
  }
}

function storeRecommendation(recommendation) {
  localStorage.setItem("plantRecommendation", JSON.stringify(recommendation));
}

function selectPlantByCategoryAndToxicity(
  category,
  toxicity,
  watering,
  style,
  extras,
  sunlight
) {
  const plants = plantConfig[category][toxicity];
  const plantKeys = Object.keys(plants);
  if (plantKeys.length > 0) {
    const selectedPlantKey = plantKeys[0];
    const plant = { ...plants[selectedPlantKey] };

    plant.soil =
      soilConfig[
        watering === "overwater"
          ? "easy_drainage_soil"
          : sunlight === "yes"
          ? "composted_soil"
          : "fertilized_soil"
      ];

    plant.details = {
      pot: potConfig[watering === "overwater" ? "clay_pot" : "ceramic_pot"],
      color:
        colorConfig[
          style === "minimalism"
            ? "clay"
            : style === "simple_decoration"
            ? "blue"
            : style === "lots_decoration"
            ? "yellow"
            : "pink"
        ],
      extras: extras,
    };

    return plant;
  }
  return null;
}

function displayRecommendation(plant, sunlight, style, watering) {
  const recommendationSection = document.getElementById("plantRecommendation");
  const plantNameElement = document.getElementById("plantName");
  const plantImageElement = document.getElementById("plantImage");
  const potImageElement = document.getElementById("potImage");
  const soilBagImageElement = document.getElementById("soilBagImage");
  const potTypeElement = document.getElementById("potType");
  const soilTypeElement = document.getElementById("soilType");
  const potColorElement = document.getElementById("potColor");
  const extrasListElement = document.getElementById("extrasList");
  const extrasImageContainer = document.getElementById("extrasImageContainer");

  plantNameElement.textContent = plant.name;
  plantImageElement.src = plant.images.plant;
  soilTypeElement.textContent = `Soil: ${plant.soil}`;
  potTypeElement.textContent = `Pot: ${plant.details.pot}`;
  potColorElement.textContent = `Color: ${plant.details.color}`;

  const potType = {};

  const soilImageSrc =
    sunlight === "yes"
      ? "images/soil-composted.png"
      : "images/soil-fertilized.png";

  let potImageSrc = "";
  if (watering === "overwater") {
    potImageSrc = "images/clay-pot.png";
  } else if (watering === "underwater" || watering === "neither") {
    potImageSrc = "images/ceramic-pot.png";
  }

  if (potType === "Ceramic Pot") {
    if (sunlight === "yes") {
      potImageSrc = "images/simple-ceramic-pot.png";
    } else {
      potImageSrc = "images/simple-ceramic-pot-decorated.png";
    }
  } else if (potType === "Clay Pot") {
    potImageSrc = "images/simple-clay-pot.png";
  } else {
    if (style === "minimalism") {
      potImageSrc = "images/simple-clay-pot.png";
    } else if (style === "simple_decoration") {
      potImageSrc = "images/simple-clay-pot-decorated.png";
    } else if (style === "lots_decoration") {
      potImageSrc = "images/painted-clay-pot-decorated.png";
    } else {
      potImageSrc = "images/simple-ceramic-pot.png";
    }
  }
  soilBagImageElement.src = soilImageSrc;
  potImageElement.src = potImageSrc;

  extrasImageContainer.innerHTML = "";
  plant.details.extras.forEach((extra) => {
    const imageElement = document.createElement("img");
    const extraImagePath = `images/${extra}.png`.replace(/_/g, "-");
    imageElement.src = extraImagePath;
    imageElement.alt = extra;
    extrasImageContainer.appendChild(imageElement);
  });

  extrasListElement.innerHTML = "";
  if (plant.details.extras.length > 0) {
    plant.details.extras.forEach((extra) => {
      const listItem = document.createElement("p");
      const extraName = getFullExtraName(extra);
      listItem.textContent = extraName;
      extrasListElement.appendChild(listItem);
    });
  } else {
    extrasListElement.textContent = "None";
  }

  recommendationSection.style.display = "block";
}

function getFullExtraName(extraValue) {
  const extraNames = {
    moss_pole: "Moss Pole",
    pebbles: "Pebbles",
    smaller_plants: "Smaller Plants",
  };

  return extraNames[extraValue] || extraValue;
}
