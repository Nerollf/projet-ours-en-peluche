import api from "./api.js";

function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsDiv = document.getElementById("cart-items");
  const totalPriceP = document.getElementById("total-price");

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Votre panier est vide.</p>";
    totalPriceP.textContent = "";
    return;
  }

  let total = 0;
  cartItemsDiv.innerHTML = cart.map(item => {
    total += item.price;
    return `
      <div class="cart-item">
        <img src="${item.imageUrl}" alt="${item.name}" width="100">
        <p><strong>${item.name}</strong> - ${item.price / 100} €</p>
        <p>Option : ${item.option}</p>
      </div>
    `;
  }).join("");

  totalPriceP.textContent = `Total : ${total / 100} €`;
}

document.addEventListener("DOMContentLoaded", () => {
  displayCart();

  const form = document.getElementById("order-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert("Votre panier est vide.");
      return;
    }

    const contact = {
      firstName: form.firstName.value.trim(),
      lastName: form.lastName.value.trim(),
      address: form.address.value.trim(),
      city: form.city.value.trim(),
      email: form.email.value.trim()
    };

    for (let key in contact) {
      if (contact[key] === "") {
        alert(`Champ ${key} vide`);
        return;
      }
    }

    const products = cart.map(item => item.id);

    const order = { contact, products };

    try {
      const response = await fetch(`${api.api}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
      });

      const result = await response.json();

      localStorage.removeItem("cart"); // vider le panier
      localStorage.setItem("orderConfirmation", JSON.stringify({
        orderId: result.orderId,
        total: products.length
      }));

      window.location.href = "confirmation.html";
    } catch (err) {
      alert("Erreur lors de la commande");
      console.error(err);
    }
  });
});
