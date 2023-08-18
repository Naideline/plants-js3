import { getPlantRecommendation } from "./plantRecommendation.js";

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

export function setupFormListeners() {
  document.getElementById("getButton").addEventListener("click", function () {
    if (validateForm()) {
      getPlantRecommendation();
      document.getElementById("customizeButton").style.display = "block"; 
    }
  });

  document.getElementById("customizeButton").addEventListener("click", function () {
    window.location.href = "customize.html"; 
  });
  
  document.getElementById("clearButton").addEventListener("click", function () {
    clearForm(); 
  });
}