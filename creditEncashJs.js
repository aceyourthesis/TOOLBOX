document.addEventListener("DOMContentLoaded", () => {
    fetch("questions.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch questions.");
        }
        return response.json();
      })
      .then((data) => {
        renderAccordion(data);
      })
      .catch((error) => {
        console.error("Error loading questions:", error);
        displayErrorMessage();
      });
  });
  
  // Function to render accordion items dynamically
  function renderAccordion(questions) {
    const accordion = document.getElementById("faq-accordion");
    accordion.innerHTML = ""; // Clear existing content
  
    questions.forEach((item, index) => {
      const accordionItem = document.createElement("div");
      accordionItem.className = "accordion-item";
  
      const headingId = `heading${index}`;
      const collapseId = `collapse${index}`;
  
      accordionItem.innerHTML = `
        <h2 class="accordion-header" id="${headingId}">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
            ${item.question}
          </button>
        </h2>
        <div id="${collapseId}" class="accordion-collapse collapse" aria-labelledby="${headingId}" data-bs-parent="#accordionExample">
          <div class="accordion-body">
            ${item.answer}
          </div>
        </div>
      `;
  
      accordion.appendChild(accordionItem);
    });
  }
  
  // Function to display an error message
  function displayErrorMessage() {
    const accordion = document.getElementById("accordionExample");
    accordion.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Failed to load questions. Please try again later.
      </div>
    `;
  }
  