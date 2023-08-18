import { fetchPlantInfo } from "./api.js";

export async function showPlantDescription(plantId) {
  const data = await fetchPlantInfo(plantId);
  
  const description = data.description;
  const plantDescriptionAccordion = document.querySelector(".plant-description-accordion");

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = description;

  plantDescriptionAccordion.innerHTML = "";
  plantDescriptionAccordion.appendChild(descriptionElement);
}
