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
  panier(data);
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

/*addButton.addEventListener("click", addToCart);*/

/*function addToCart() {
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

  let cartList = JSON.stringify(cart);
  localStorage.setItem("cart", cartList);
}*/

/**
 * store products in localStorage 
  @param {} article 
 */
function panier(article) {
  const btn = document.querySelector("#addToCart");
  btn.addEventListener("click", () => {
    let quantity = selectedNumber;
    let couleurs = selectedColor;
    console.log("quantité : " + quantity);
    console.log("couleurs : " + couleurs);

    // check if color and quantity are not empty
    if (couleurs != "" && quantity <= 100 && quantity != 0) {
      // get the selected color and quantity
      let Couleur = couleurs;
      let Quantity = Number(quantity);
      let Id = article._id;

      /**
       * new item to add to cart
       * @return Objet json
       */
      let productImageSource = productImage.firstElementChild;
      let obj = {
        imgsrc: productImageSource.src,
        imgalt: productImageSource.alt,
        id: Id,
        colors: Couleur,
        name: productName.innerHTML,
        quantity: Number(Quantity),
      };
      console.log(obj);
      /**
       * @return the products present in localStorage.getItem('obj');
       */

      let produitLocalStorage = JSON.parse(localStorage.getItem("obj"));
      console.log(produitLocalStorage);
      console.log(localStorage);

      /**
       * @return a confirmation box if yes redirection to the basket
       */
      const confirmation = () => {
        if (
          window.confirm(
            `${Quantity} ${article.name} ${Couleur} été ajouté à votre panier !` +
              `Pour consulter votre panier, cliquez sur OK`
          )
        ) {
          window.location.href = "cart.html";
        }
      };

      // if a product is present in localStorage \\
      if (produitLocalStorage !== null) {
        /**
         * checks if the item is already in the cart
         * @return the product(s) present in productLocalStorage
         */
        const Find = produitLocalStorage.find(
          (element) => element.id === Id && element.colors === Couleur
        );
        console.log(Find);
        // if the product is already in the basket
        if (Find) {
          /**
           * adjust the quantity of the product
           * @return obj.quantity + Find.quantity
           */
          let ChangeQuantity = parseInt(obj.quantity) + parseInt(Find.quantity);
          Find.quantity = ChangeQuantity;
          localStorage.setItem("obj", JSON.stringify(produitLocalStorage));
          console.log(
            "la quantités du produit est maintenant de : " + Find.quantity
          );
          confirmation();
          // if it is already in the basket and the color is not the same, it adds it
        } else {
          produitLocalStorage.push(obj);
          localStorage.setItem("obj", JSON.stringify(produitLocalStorage));
          confirmation();
        }
        // if the product is not in the basket add it to the table
      } else {
        produitLocalStorage = [];
        produitLocalStorage.push(obj);
        localStorage.setItem("obj", JSON.stringify(produitLocalStorage));
        confirmation();
      }
    }
  });
}
console.log(localStorage);
