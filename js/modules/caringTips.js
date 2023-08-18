import { fetchPlantInfo } from "./api.js";

export async function showCaringTips(plantId) {
  const data = await fetchPlantInfo(plantId);

  if (data && data.care) {
    const caringTipsElement = document.createElement("div");
    caringTipsElement.classList.add("caring-tips");

    const tipsTitle = document.createElement("h2");
    tipsTitle.textContent = "Caring Tips";

    caringTipsElement.appendChild(tipsTitle);

    const tipsList = document.createElement("ul");

    const tipIcons = {
      light: "images/icons/light.svg",
      water: "images/icons/water.svg",
      humidity: "images/icons/humidity.svg",
      temperature: "images/icons/temperature.svg",
    };

    for (const [key, value] of Object.entries(data.care)) {
      const tipSection = document.createElement("p");
      tipSection.classList.add("tip-section");

      const tipIcon = document.createElement("div");
      tipIcon.classList.add("tip-icon");
      const iconImg = document.createElement("img");
      iconImg.src = tipIcons[key] || "";
      tipIcon.appendChild(iconImg);

      const tipTitle = document.createElement("h4");
      tipTitle.classList.add("tip-title");
      tipTitle.textContent = key;

      const tipText = document.createElement("p");
      tipText.classList.add("tip-text");
      tipText.textContent = value;

      tipSection.appendChild(tipIcon);
      tipSection.appendChild(tipTitle);
      tipSection.appendChild(tipText);

      tipsList.appendChild(tipSection);
    }

    caringTipsElement.appendChild(tipsList);

    const caringTipsAccordion = document.querySelector(
      ".caring-tips-accordion"
    );
    caringTipsAccordion.innerHTML = "";
    caringTipsAccordion.appendChild(caringTipsElement);
  } else {
    console.error("Invalid or missing caring tips data:", data);
  }
}
