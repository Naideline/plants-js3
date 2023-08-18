export function getPlantImage(plant) {
  const plantImages = {
    aglaonema: "images/plant-aglaonema.png",
    aloe: "images/plant-aloe.png",
    bostonFern: "images/plant-fern.png",
    cactus: "images/plant-cactus.png",
    monstera: "images/plant-monstera.png",
    peaceLily: "images/plant-peace-lily.png",
    sansevieria: "images/plant-sansevieria.png",
  };

  return plantImages[plant] || "";
}




