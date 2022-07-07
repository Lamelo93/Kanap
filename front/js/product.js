//Variables
const apiURL = "http://localhost:3000/api/products";
const params = new URLSearchParams(window.location.search);
let productId = params.get("id");
let productIdUrl = `${apiURL}/${productId}`;
let productColors = [];
let productDescription = document.getElementById("description");
let productImage = document.querySelector(".item__img");
let productName = document.getElementById("title");
let productPrice = document.getElementById("price");

//Panier
let cart = [];

//Récupération des données produits
async function getapi(url) {
  const response = await fetch(url).catch(function (err) {
    console.error(error);
  });

  let data = await response.json();

  data.colors.forEach((color) => {
    productColors.push(color);
  });

  showColors(productColors);
  showDescription(data);
  showImage(data);
  showTitle(data);
  showPrice(data);
}

//Afficher les données produit
getapi(productIdUrl);

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

//selection de la couleur
let colorMenu = document.getElementById("colors");

let selectedColor = "";

colorMenu.addEventListener("change", selectColor);

function selectColor(Event) {
  selectedColor = Event.target.value;

  console.log(selectedColor);
}

//selection du nombre d'articles
let articlesNumber = document.getElementById("quantity");

let selectedNumber = 0;

articlesNumber.addEventListener("input", selectNumber);

function selectNumber(input) {
  selectedNumber = input.target.value;
  console.log(selectedNumber);
}

//Ajouter produit au panier
let addButton = document.getElementById("addToCart");

addButton.addEventListener("click", addToCart);

function addToCart() {
  let productImageSource = productImage.firstElementChild;
  let productToAdd = {
    imgsrc: productImageSource.src,
    imgalt: productImageSource.alt,
    id: productId,
    name: productName.innerText,
    price: Number(productPrice.innerText),
    color: selectedColor,
    number: Number(selectedNumber),
  };

  let item = cart.find(product => product.color === productToAdd.color);
  if (item) {
    product.number += productToAdd.number;
  } else {
    cart.push(item);
  }
  

  

  console.log(cart);
  console.log(cart.length);
  console.log(productToAdd);
  let cartList = JSON.stringify(cart);
  localStorage.setItem("cart", cartList);
}
