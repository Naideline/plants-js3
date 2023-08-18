export async function fetchPlantInfo(plantId) {
    try {
      const response = await fetch(
        `https://qfble0gquj.execute-api.us-east-2.amazonaws.com/plant-store/info/${plantId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return null;
    }
  }
  