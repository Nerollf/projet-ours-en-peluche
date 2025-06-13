import api from "./api.js";

async function getProduct(id) {
  try {
    const response = await fetch(`${api.api}/${id}`);
    return await response.json();
  } catch (err) {
    console.error("Erreur de récupération du produit :", err);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  const id = localStorage.getItem('teddiesID');
  if (!id) {
    document.getElementById("product-detail").innerHTML = "<p>Produit introuvable</p>";
    return;
  }

  const product = await getProduct(id);

  const container = document.getElementById("product-detail");
  container.innerHTML = `
    <div class="product">
      <img src="${product.imageUrl}" alt="${product.name}">
      <div class="product-text">
        <p class="product-name">${product.name}</p>
        <p class="product-desc">${product.description}</p>
        <p class="product-price">${product.price / 100} €</p>

        <label for="option">Personnalisation :</label>
        <select id="option">
          ${product.colors.map(color => `<option value="${color}">${color}</option>`).join('')}
        </select>

        <button id="add-to-cart">Ajouter au panier</button>
      </div>
    </div>
  `;

  document.getElementById("add-to-cart").addEventListener("click", () => {
    const selectedOption = document.getElementById("option").value;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
      id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      option: selectedOption,
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produit ajouté au panier !");
    window.location.href = "panier.html";
  });
});
