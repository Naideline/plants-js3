export async function loadPlantData() {
    try {
      const response = await fetch('./config.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      
      return data.plants;
    } catch (error) {
      console.error(error);
      return [];
    }
  }