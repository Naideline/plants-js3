export function displayPlantRecommendation(recommendedPlant) {
    document.getElementById("plantName").textContent = capitalizeFirstLetter(recommendedPlant.name);
    document.getElementById("soilType").textContent = recommendedPlant.soilType;
    document.getElementById("potType").textContent = recommendedPlant.potMaterial;
    document.getElementById("potColor").textContent = recommendedPlant.potColor;
    document.getElementById("extrasList").textContent = recommendedPlant.extras.join(", ");
    document.getElementById("plantImage").src = recommendedPlant.image;
    document.getElementById("potImage").src = recommendedPlant.potImage;
    document.getElementById("soilBagImage").src = recommendedPlant.soilBagImage;
    document.getElementById("plantRecommendation").style.display = "block";
  }
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  