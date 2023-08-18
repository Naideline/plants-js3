export function initializeAccordions() {
  const accordions = document.querySelectorAll(".accordion-title");

  accordions.forEach((accordion) => {
    accordion.addEventListener("click", function () {
      accordions.forEach((otherAccordion) => {
        if (otherAccordion !== accordion) {
          otherAccordion.classList.remove("active");
          otherAccordion.nextElementSibling.style.display = "none";
        }
      });

      accordion.classList.toggle("active");
      const accordionContent = accordion.nextElementSibling;
      if (accordionContent.style.display === "block") {
        accordionContent.style.display = "none";
      } else {
        accordionContent.style.display = "block";
      }
    });
  });
}
