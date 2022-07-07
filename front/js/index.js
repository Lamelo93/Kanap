//variables
const apiURL = "http://localhost:3000/api/products";

//Récupération des données produits
async function getapi(url) {
  const response = await fetch(url) .catch (function(err) {
    console.error(error);
  });

  let data = await response.json();
  console.log(data);

  show(data);
}

//Contenu HTML pour chaque produit affiché
function show(data) {
  data.forEach((produit) => {
    items.innerHTML += `<a href="./product.html?id=${produit._id}&colors=${produit.colors}">
        <article>
          <img src="${produit.imageUrl}" alt="${produit.altTxt}"/>
          <h3 class="productName">${produit.name}</h3>
          <p class="productDescription">${produit.description}</p>
        </article>
      </a>`;
  });
}

//afficher éléments

getapi(apiURL);