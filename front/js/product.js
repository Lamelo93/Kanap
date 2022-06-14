//Variables
const apiURL = "http://localhost:3000/api/products";
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const productIdUrl = `${apiURL}/${productId}`;
const productColors = [];
const productDescription = document.getElementById("description");
const productImage = document.querySelector(".item__img");
const productName = document.getElementById("title");
const productPrice = document.getElementById("price");



//Récupération des données produits
async function getapi(url) {
  const response = await fetch(url).catch(function (err) {
    console.error(error);
  });

  let data = await response.json();
  console.log(data);

  data.colors.forEach((color) => {
    productColors.push(color);
  });

  showColors(productColors);
  showDescription(data);
  showImage(data);
  showTitle(data);
  showPrice(data);
}

//Affichage des couleurs dans les options
function showColors(productColors) {
  productColors.forEach((color) => {
    document.getElementById(
      "colors"
    ).innerHTML += `<option value=${color}>${color}</option>`;
  });
}

//Affichage de la description
function showDescription(data) {
    productDescription.innerText = data.description;
}

//Affichage de l'image du produit
function showImage(data) {
    productImage.innerHTML += `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
}

//Affichage du nom du produit
function showTitle(data) {
    productName.innerText = data.name;
}

//Affichage du prix du produit
function showPrice(data) {
    productPrice.innerText = data.price;
}

getapi(productIdUrl);
