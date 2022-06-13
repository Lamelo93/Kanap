//Variables
const apiURL = "http://localhost:3000/api/products";
let params = new URLSearchParams(window.location.search);
const productId = params.get("id");
let productIdUrl = `${apiURL}/${productId}`;
let productColors = [];

console.log(productIdUrl);

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

  console.log(productColors);
  showColors(productColors);
}

//Affichage des couleurs dans les options
function showColors(productColors) {
  productColors.forEach((color) => {
    document
    .getElementById("colors")
    .innerHTML += `<option value=${color}>${color}</option>`;
  });
}


//Affichage de la description


getapi(productIdUrl);