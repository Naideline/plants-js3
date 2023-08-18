import { FormSubject } from "./formSubject.js";
import { PreviewObserver } from "./previewObserver.js";
import { initializeAccordions } from "./accordion.js";
import { showCaringTips } from "./caringTips.js";
import { showPlantDescription } from "./plantDescription.js";

export function initializeProduct() {
  const productPlantName = document.getElementById("productPlantName");
  const productPlantImage = document.getElementById("productPlantImage");
  const productPotImage = document.getElementById("productPotImage");
  const productSoil = document.getElementById("productSoil");
  const productPot = document.getElementById("productPot");
  const productPotColor = document.getElementById("productPotColor");
  const productExtras = document.getElementById("productExtras");

  const formSubject = new FormSubject();

  const previewObserver = new PreviewObserver(
    productPlantName,
    productPlantImage,
    productPotImage,
    productSoil,
    productPot,
    productPotColor,
    productExtras
  );
  formSubject.addObserver(previewObserver);

  const customizationData = JSON.parse(
    localStorage.getItem("customizationData")
  );
  if (customizationData) {
    formSubject.notifyObservers(customizationData);
  }

  initializeAccordions();

  const storedRecommendation = localStorage.getItem("plantRecommendation");

  let plantId = "aglaonema";

  if (storedRecommendation) {
    const recommendation = JSON.parse(storedRecommendation);
    plantId = recommendation.name.toLowerCase();
  } else if (customizationData) {
    const data = JSON.parse(customizationData);
    const customPlantImage = data.customPlantImage || "";
    const plantIdMatch = customPlantImage.match(/images\/plant-(\w+)\.png/);

    if (plantIdMatch && plantIdMatch[1]) {
      plantId = plantIdMatch[1];
    }
  }

  showPlantDescription(plantId);
  showCaringTips(plantId);
}
