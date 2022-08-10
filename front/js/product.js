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
let cart = [];

//Afficher les données produit
getapi(productIdUrl);

//Récupération des données du produit dans l'API
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
  panier(data);
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

//Sélection de la couleur
let colorMenu = document.getElementById("colors");

let selectedColor = "";

colorMenu.addEventListener("change", selectColor);

function selectColor(Event) {
  selectedColor = Event.target.value;

  console.log(selectedColor + " sélectionné");
}

//Sélection du nombre d'articles
let articlesNumber = document.getElementById("quantity");

let selectedNumber = 0;

articlesNumber.addEventListener("input", selectNumber);

function selectNumber(input) {
  selectedNumber = input.target.value;
  console.log(selectedNumber + " articles seront ajoutés");
}

// Ajout des articles au panier

function panier(article) {
  const btn = document.querySelector("#addToCart");
  btn.addEventListener("click", () => {
    let quantity = selectedNumber;
    let couleurs = selectedColor;
    console.log("Qté ajoutée : " + quantity);
    console.log("Clr confirmée : " + couleurs);

    // Récupération des couleurs + quantité + id + image
    if (couleurs != "" && quantity <= 100 && quantity != 0) {
      let Couleur = couleurs;
      let Quantity = Number(quantity);
      let Id = article._id;
      let productImageSource = productImage.firstElementChild;

      // Création d'un objet contenant les infos du produit
      let obj = {
        imgsrc: productImageSource.src,
        imgalt: productImageSource.alt,
        id: Id,
        colors: Couleur,
        name: productName.innerHTML,
        quantity: Number(Quantity),
      };
      console.log(obj); //Article

      // Produit présent dans le localStorage
      let produitLocalStorage = JSON.parse(localStorage.getItem("obj"));
      console.log(produitLocalStorage); // Articles envoyés au panier

      // Confirmation d'ajout au panier et renvoi vers la page panier
      const confirmation = () => {
        if (
          window.confirm(
            `${Quantity} ${article.name} ${Couleur} ajouté(s) à votre panier ! ` +
              `Cliquer sur OK pour accéder au panier, annuler pour ajouter plus d'articles`
          )
        ) {
          window.location.href = "cart.html";
        }
      };

      // Vérification de la présence du produit identique (id + couleur) dans le localStorage
      if (produitLocalStorage !== null) {
        const Find = produitLocalStorage.find(
          (element) => element.id === Id && element.colors === Couleur
        );

        // Ajout du même produit de même couleur (incrémentation de la quantité ajoutée)
        if (Find) {
          let ChangeQuantity = parseInt(obj.quantity) + parseInt(Find.quantity);

          // l'article déja présent en local voit sa quantité modifiée
          Find.quantity = ChangeQuantity;
          localStorage.setItem("obj", JSON.stringify(produitLocalStorage));
          console.log(
            "Il y a maintenant " +
              Find.quantity +
              " " +
              Find.name +
              " dans le panier"
          );
          confirmation();

          // Ajout du même produit de couleur différente (nouvel objet)
        } else {
          produitLocalStorage.push(obj);
          localStorage.setItem("obj", JSON.stringify(produitLocalStorage));
          confirmation();
        }
        // Ajout du produit absent du panier (nouvel objet)
      } else {
        produitLocalStorage = [];
        produitLocalStorage.push(obj);
        localStorage.setItem("obj", JSON.stringify(produitLocalStorage));
        confirmation();
      }
    } else {
      window.alert("Merci de sélectionner au moins une couleur et une quantité supérieure à 0 article(s)");
    }
  });
}
