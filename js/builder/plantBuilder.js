class PlantBuilder {
  constructor() {
    this.plant = {};
  }

  withPlantName(name) {
    this.plant.name = name;
    return this;
  }

  withSoilType(type) {
    this.plant.soilType = type;
    return this;
  }

  withPotMaterial(material) {
    this.plant.potMaterial = material;
    return this;
  }

  withPotStyle(style) {
    this.plant.potStyle = style;
    return this;
  }

  withPotColor(color) {
    this.plant.potColor = color;
    return this;
  }

  addExtras(extras) {
    this.plant.extras = extras;
    return this;
  }

  withImage(image) {
    this.plant.image = image;
    return this;
  }

  withPotImage(potImage) {
    this.plant.potImage = potImage;
    return this;
  }

  withSoilBagImage(soilBagImage) {
    this.plant.soilBagImage = soilBagImage;
    return this;
  }

  withExtrasImages(extrasImages) {
    this.plant.extrasImages = extrasImages;
    return this;
  }

  build() {
    return this.plant;
  }
}

export default PlantBuilder;