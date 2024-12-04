document.addEventListener("DOMContentLoaded", () => {
    console.log("Webpage initialized.");
  
    // Example: Dynamic rendering of products
    fetch('products.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch product data.');
        }
        return response.json();
      })
      .then(data => {
        renderProducts(data); // Call render function with fetched data
      })
      .catch(error => {
        console.error('Error loading products:', error);
        displayErrorMessage();
      });
  });
  
  // Function to render products as Bootstrap cards
  function renderProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";
  
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "col-md-3";
      card.innerHTML = `
        <div class="card g-3">
          <img src="${product.image}" class="card-img-top img-fit" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text ">${product.description}</p>
          </div>
          <div class="text-center g-3">
            <a class="btn btn-outline-primary" href="${product.link}" target="_blank" role="button">Go to Shopee</a>
          </div>
        </div>
      `;
      productList.appendChild(card);
    });
  }
  
  // Function to display an error message if products fail to load
  function displayErrorMessage() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger" role="alert">
          Failed to load products. Please try again later.
        </div>
      </div>
    `;
  }
  