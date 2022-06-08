//variables
const apiURL = "http://localhost:3000/api/products";


async function getapi(url) {
  const response = await fetch(url);

  let data = await response.json();
  console.log(data);

  show(data);
}
//afficher elements

getapi(apiURL);


//modifier html
function show(data) {
  data.forEach((produit) => {
    items.innerHTML += `<a href="./product.html?id=${produit._id}">
        <article>
          <img src="${produit.imageUrl}" alt="${produit.altTxt}"/>
          <h3 class="productName">${produit.name}</h3>
          <p class="productDescription">${produit.description}</p>
        </article>
      </a>`;
  });
}
