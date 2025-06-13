import api from "./api.js";

async function GetTeddy() {
    let response = await fetch(`${api.api}`);
    let data = await response.json();
    return data;
}

window.addEventListener("DOMContentLoaded", async () => {
    let data = await GetTeddy();
    let productHTML = '';
    for (let produit of data) {
        productHTML += `<div class="product" data-id="${produit._id}">
                        <img src="${produit.imageUrl}" alt="${produit.name}">
                        <div class="product-text">
                            <p class="product-name">${produit.name}</p>
                            <p class="product-desc">${produit.description}</p>
                            <p class="product-price">${produit.price / 100} €</p>
                        </div>                        
                      </div>`
    }
    document.querySelector('#products').innerHTML = productHTML;

    document.querySelectorAll('.product').forEach(product => {
        product.addEventListener('click', () => {
            const id = product.getAttribute('data-id')
            console.log(id);
            localStorage.setItem('teddiesID', id)
            window.location.href = 'produit.html';
        })
    })
})