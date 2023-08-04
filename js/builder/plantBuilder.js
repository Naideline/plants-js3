const PlantBuilder = {
  recommendedPlant: {},

  withPlantName(name) {
    this.recommendedPlant.name = name;
    return this;
  },

  withSoilType(type) {
    this.recommendedPlant.soilType = type;
    return this;
  },

  withPotMaterial(material) {
    this.recommendedPlant.potMaterial = material;
    return this;
  },

  withPotStyle(style) {
    this.recommendedPlant.potStyle = style;
    return this;
  },

  withPotColor(color) {
    this.recommendedPlant.potColor = color;
    return this;
  },

  addExtras(extras) {
    this.recommendedPlant.extras = extras; 
    return this;
  },
  
  withImage(image) {
    this.recommendedPlant.image = image;
    return this;
  },

  withPotImage(potImage) {
    this.recommendedPlant.potImage = potImage;
    return this;
  },

  withSoilBagImage(soilBagImage) {
    this.recommendedPlant.soilBagImage = soilBagImage;
    return this;
  },

  withExtrasImages(extrasImages) {
    this.recommendedPlant.extrasImages = extrasImages;
    return this;
  },

  build() {
    return this.recommendedPlant;
  },
};

export default PlantBuilder;
