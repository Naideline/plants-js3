import { getPlantRecommendation } from "./modules/plantRecommendation.js";
import { clearForm } from "./modules/form.js";


document.getElementById("getButton").addEventListener("click", function() {
  getPlantRecommendation();
});

document.getElementById("clearButton").addEventListener("click", clearForm);
