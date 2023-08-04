import PlantBuilder from "../builder/plantBuilder.js";
import { validateForm } from "./form.js";
import { displayPlantRecommendation } from "./plantDisplay.js";
import { loadPlantData } from "./plantConfig.js";

export async function getPlantRecommendation() {
    if (!validateForm()) {
      alert("Please fill in all the required fields before getting the plant recommendation.");
      return;
    }
    const data = await loadPlantData();
    const formData = new FormData(document.getElementById("plantForm"));
  
    const extraElements = formData.getAll("extra_elements");
  
    function calculatePlantScore(plantData) {
      let score = 0;
    
      const placement = formData.get("placement");
      if (
        (placement === "inside_indirect" && plantData.light === "Low Light Plant") ||
        (placement === "inside_direct" && plantData.light === "Medium Light Plant") ||
        (placement === "outside" && plantData.light === "Outdoor Plant")
      ) {
        score++;
      }
    
      const sunlight = formData.get("sunlight");
      if (
        (sunlight === "yes" && plantData.soil === "Composted Soil") ||
        (sunlight === "no" && plantData.soil === "Fertilized Soil")
      ) {
        score++;
      }
    
      const pets = formData.get("pets");
      if (
        (pets === "yes" && plantData.toxic) ||
        (pets === "no" && !plantData.toxic)
      ) {
        score++;
      }
    
      const watering = formData.get("watering");
      if (
        (watering === "overwater" && plantData.name === "Peace Lily") ||
        (watering !== "overwater" && plantData.name !== "Peace Lily")
      ) {
        score++;
      }
    
  
      const style = formData.get("style");
      if (
        (style === "minimalism" && plantData.pot.style === "Simple pot") ||
        (style === "simple_decoration" && plantData.pot.style === "Simple pot decorated") ||
        (style === "lots_decoration" && plantData.pot.style === "Painted pot decorated")
      ) {
        score++;
      }
    
      const extraElements = formData.getAll("extra_elements");
      extraElements.forEach((extra) => {
        if (plantData.extras.includes(extra)) {
          score++;
        }
      });
    
      return score;
    }
    
    let bestScore = -1;
    let recommendedPlantData = null;
  
    data.forEach((plantData) => {
      const plantScore = calculatePlantScore(plantData);
      if (plantScore > bestScore) {
        bestScore = plantScore;
        recommendedPlantData = plantData;
      }
    });
  
    if (!recommendedPlantData) {
      alert("No hay plantas que coincidan con tus preferencias. Por favor, intenta con diferentes opciones.");
      return;
    }
  
    const recommendedPlant = PlantBuilder
      .withPlantName(recommendedPlantData.name)
      .withSoilType(recommendedPlantData.soil)
      .withPotMaterial(recommendedPlantData.pot.material)
      .withPotStyle(recommendedPlantData.pot.style)
      .withPotColor(recommendedPlantData.pot.color)
      .withImage(recommendedPlantData.image)
      .withPotImage(recommendedPlantData.pot.image)
      .withSoilBagImage(recommendedPlantData.soilBagImage)
      .withExtrasImages(recommendedPlantData.extras.map(extra => `images/${extra}.png`))
      .addExtras(extraElements)
      .build();
  
    displayPlantRecommendation(recommendedPlant);
  }
  
