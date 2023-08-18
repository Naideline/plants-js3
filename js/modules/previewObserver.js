import { getFullExtraName } from "./customization.js";

export class PreviewObserver {
  constructor(customPlantName, customPlantImage, customPotImage, customSoil, customPot, customPotColor, customExtras) {
    this.customPlantName = customPlantName;
    this.customPlantImage = customPlantImage;
    this.customPotImage = customPotImage;
    this.customSoil = customSoil;
    this.customPot = customPot;
    this.customPotColor = customPotColor;
    this.customExtras = customExtras;
  }

  update(formData) {
    if (formData.customPlantName) {
      this.customPlantName.textContent = `Name: ${formData.customPlantName}`;
    }

    if (formData.customPlantImage) {
      this.customPlantImage.src = formData.customPlantImage;
    }

    if (formData.customPotImage) {
      this.customPotImage.src = formData.customPotImage;
    }

    if (formData.customSoil) {
      this.customSoil.textContent = `Soil: ${formData.customSoil} `;
    }

    if (formData.customPot) {
      this.customPot.textContent = `Pot:  ${formData.customPot}`;
    }

    if (formData.customPotColor) {
      this.customPotColor.textContent = `Color: ${formData.customPotColor}`;
    }

    if (formData.customExtras.length > 0) {
      this.customExtras.textContent = `Extras: ${formData.customExtras.map(extra => getFullExtraName(extra)).join(", ")}`;
    } else {
      this.customExtras.textContent = "Extras: None";
    }
  }
}

