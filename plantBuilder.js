class PlantBuilder {
  constructor() {
    this.recommendedPlant = {};
  }

  withPlantData(plantData) {
    this.recommendedPlant.name = plantData.name;
    this.recommendedPlant.image = plantData.image;
    this.recommendedPlant.soilType = plantData.soil;
    return this;
  }

  setPotMaterial(material, style, color) {
    this.recommendedPlant.pot = {
      material,
      style,
      color,
    };
    return this;
  }

  addExtras(extrasList) {
    this.recommendedPlant.extras = extrasList;
    return this;
  }

  build() {
    return this.recommendedPlant;
  }
}

export default PlantBuilder;
