document.addEventListener("DOMContentLoaded", () => {
  const confirmationDiv = document.getElementById("confirmation-message");
  const orderData = JSON.parse(localStorage.getItem("orderConfirmation"));

  if (!orderData) {
    confirmationDiv.innerHTML = "<p>Aucune commande trouvée.</p>";
    return;
  }

  confirmationDiv.innerHTML = `
    <p>Votre commande a bien été enregistrée !</p>
    <p><strong>Numéro de commande :</strong> ${orderData.orderId}</p>
    <p><strong>Total payé :</strong> ${orderData.total} article(s)</p>
  `;

  localStorage.removeItem("orderConfirmation");
});
