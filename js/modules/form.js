import {getPlantRecommendation} from "./plantRecommendation.js";

export function validateForm() {
    const form = document.getElementById("plantForm");
    const formData = new FormData(form);
    const requiredFields = [
      "placement",
      "sunlight",
      "pets",
      "watering",
      "style"
    ];
  
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        return false;
      }
    }
    return true;
  }

  export function clearForm() {
    const form = document.getElementById("plantForm");
    form.reset();
    document.getElementById("plantRecommendation").style.display = "none";
  }
  
  document.getElementById("getButton").addEventListener("click", function() {
    getPlantRecommendation();
  });
  document.getElementById("clearButton").addEventListener("click", clearForm);