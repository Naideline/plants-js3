import PlantBuilder from "./plantBuilder.js";

const loadPlantData = async () => {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    return data.plants;
  } catch (error) {
    console.error("Error loading plant data:", error);
    return [];
  }
};

const getPlantRecommendation = async () => {
  const data = await loadPlantData();

  const formData = new FormData(document.getElementById("plantForm"));
  //const placement = formData.get('placement');
  const sunlight = formData.get("sunlight");
  const pets = formData.get("pets");
  const watering = formData.get("watering");
  const style = formData.get("style");
  const extraElements = formData.getAll("extra_elements");

  const filteredPlants = data.filter((plantData) => {
    return (
      (plantData.soil === "Composted Soil" && sunlight === "no") ||
      (plantData.soil === "Fertilized Soil" && sunlight === "yes") ||
      (pets === "no" &&
        ["Boston Fern", "Monstera", "Cactus"].includes(plantData.name)) ||
      (pets === "yes" &&
        ["Sansevieria", "Aloe Vera"].includes(plantData.name)) ||
      (watering === "overwater" && plantData.name === "Sansevieria") ||
      (watering !== "overwater" &&
        ["Boston Fern", "Monstera", "Cactus"].includes(plantData.name)) ||
      (style === "minimalism" &&
        plantData.pot.style === "Simple pot" &&
        plantData.pot.color === "clay") ||
      (style === "simple_decoration" &&
        plantData.pot.style === "Simple pot decorated" &&
        plantData.pot.color === "blue") ||
      (style === "lots_decoration" &&
        plantData.pot.style === "Painted pot decorated" &&
        plantData.pot.color === "yellow") ||
      extraElements.every((extra) => plantData.extras.includes(extra))
    );
  });

  if (filteredPlants.length === 0) {
    alert("No plants match your preferences. Please try different options.");
    return;
  }

  const recommendedPlantData =
    filteredPlants[Math.floor(Math.random() * filteredPlants.length)];

  const plantBuilder = new PlantBuilder();
  const recommendedPlant = plantBuilder
    .withPlantData(recommendedPlantData)
    .setPotMaterial(
      recommendedPlantData.pot.material,
      recommendedPlantData.pot.style,
      recommendedPlantData.pot.color,
    )
    .addExtras(recommendedPlantData.extras)
    .build();

  document.getElementById("plantName").textContent = recommendedPlant.name;
  document.getElementById("soilType").textContent = recommendedPlant.soilType;
  document.getElementById("potType").textContent =
    recommendedPlant.pot.material;
  document.getElementById("potColor").textContent = recommendedPlant.pot.color;
  document.getElementById("extrasList").textContent =
    recommendedPlant.extras.join(", ");
  document.getElementById("plantImage").src = recommendedPlant.image;

  document.getElementById("plantRecommendation").style.display = "block";
};

const clearForm = () => {
  const form = document.getElementById("plantForm");
  form.reset();
  document.getElementById("plantRecommendation").style.display = "none";
};

document
  .getElementById("getButton")
  .addEventListener("click", getPlantRecommendation);
document.getElementById("clearButton").addEventListener("click", clearForm);
