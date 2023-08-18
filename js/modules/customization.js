import { FormSubject } from "./formSubject.js";
import { PreviewObserver } from "./previewObserver.js";
import { getPlantImage } from "./utilities.js";

export function initializeCustomization() {
  const customPlantName = document.getElementById("customPlantName");
  const customPlantImage = document.getElementById("customPlantImage");
  const customPotImage = document.getElementById("customPotImage");
  const customSoil = document.getElementById("customSoil");
  const customPot = document.getElementById("customPot");
  const customPotColor = document.getElementById("customPotColor");
  const customExtras = document.getElementById("customExtras");

  const formSubject = new FormSubject();

  const previewObserver = new PreviewObserver(
    customPlantName,
    customPlantImage,
    customPotImage,
    customSoil,
    customPot,
    customPotColor,
    customExtras
  );
  formSubject.addObserver(previewObserver);

  const formElementIds = [
    "clayPot",
    "ceramicPot",
    "potDecorationToggle",
    "potColorToggle",
    "blueColor",
    "pinkColor",
    "greenColor",
    "purpleColor",
    "basicSoil",
    "premiumSoil",
    "easyDrainageSoil",
    "plantSelect",
    "mossPole",
    "pebbles",
    "smallerPlants",
  ];

  const formElements = formElementIds.map((id) => document.getElementById(id));

  formElements.forEach((element) => {
    element.addEventListener("change", function () {
      const formData = {
        customPlantName: plantSelect.options[plantSelect.selectedIndex].text,
        customPlantImage: customPlantImage.src,
        customPotImage: customPotImage.src,
        customSoil: document.querySelector('input[name="soil"]:checked')
          ? document.querySelector('input[name="soil"]:checked').value
          : "",
        customPot: document.querySelector('input[name="pot"]:checked')
          ? document.querySelector('input[name="pot"]:checked').value
          : "",
        customPotColor: document.querySelector('input[name="potColor"]:checked')
          ? document.querySelector('input[name="potColor"]:checked').value
          : "",
        customExtras: Array.from(
          document.querySelectorAll('input[name="extras"]:checked')
        ).map((extra) => extra.value),
      };

      formSubject.notifyObservers(formData);

      if (element.id === "potColorToggle" && element.checked) {
        const potColorSelect = document.querySelector(
          'input[name="potColor"]:checked'
        );
        if (potColorSelect) {
          updatePlantPotImage(potColorSelect.value);
        }
      }
      localStorage.setItem("customizationData", JSON.stringify(formData));
    });

    const checkStoreAvailabilityBtn = document.getElementById(
      "checkStoreAvailabilityBtn"
    );
    checkStoreAvailabilityBtn.addEventListener("click", function () {
      window.location.href = "producto.html";
    });
  });

  const plantSelect = document.getElementById("plantSelect");
  plantSelect.addEventListener("change", function () {
    const selectedPlant = plantSelect.value;
    const plantImageSrc = getPlantImage(selectedPlant);
    customPlantImage.src = plantImageSrc;
  });

  const potColorSelect = document.getElementById("potColorToggle");
  potColorSelect.addEventListener("change", function () {
    const selectedPotColor = document.querySelector(
      'input[name="potColor"]:checked'
    )?.value;
    if (potColorSelect.checked) {
      updatePlantPotImage(selectedPotColor);
    }
  });

  const colorOptions = [
    { id: "blueColor", color: "blue" },
    { id: "pinkColor", color: "pink" },
    { id: "greenColor", color: "green" },
    { id: "purpleColor", color: "purple" },
  ];

  colorOptions.forEach((colorOption) => {
    const inputElement = document.getElementById(colorOption.id);
    const labelElement = inputElement.parentElement;

    labelElement.style.background = colorOption.color;
    labelElement.classList.add("color-option");
  });

  colorOptions.forEach((colorOption) => {
    const inputElement = document.getElementById(colorOption.id);
    inputElement.addEventListener("change", function () {
      if (inputElement.checked) {
        updatePlantPotImage(colorOption.color);
      }
    });
  });

  function updatePlantPotImage(potColor) {
    const potImages = {
      blue: "images/pots/ceramic-decorated-blue.PNG",
      pink: "images/pots/clay-simple-pink.PNG",
      green: "images/pots/ceramic-simple-green.PNG",
      purple: "images/pots/clay-decorated-purple.PNG",
    };

    const potImageSrc = potImages[potColor] || "";
    customPotImage.src = potImageSrc;
  }
  const storedRecommendation = localStorage.getItem("plantRecommendation");
  if (storedRecommendation) {
    const recommendation = JSON.parse(storedRecommendation);
    const formData = {
      customPlantName: recommendation.plantName,
      customPlantImage: recommendation.images.plant,
      customPotImage:
        recommendation.details.pot === "Ceramic pot"
          ? "images/simple-ceramic-pot.png"
          : "images/simple-clay-pot.png",
      customSoil: recommendation.soil,
      customPot: recommendation.details.pot,
      customPotColor: recommendation.details.color,
      customExtras: recommendation.details.extras,
    };
    formSubject.notifyObservers(formData);
  }
}

export function getFullExtraName(extraValue) {
  const extraNames = {
    moss_pole: "Moss Pole",
    pebbles: "Pebbles",
    smaller_plants: "Smaller Plants",
  };
  return extraNames[extraValue] || extraValue;
}
