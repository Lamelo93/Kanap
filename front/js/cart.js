//variables
const apiURL = "http://localhost:3000/api/products";
// Récupération du contenu du panier
let cartList = localStorage.getItem("obj");
let cart = JSON.parse(cartList);
let cartItems = document.querySelectorAll(".cart__item");
let itemQuantity = document.querySelectorAll(".itemQuantity");
let cartQuantity = 0;
let produitsAffiches = document.querySelectorAll("article");
let btn = document.getElementById("order");

// Variables de vérification des champs
let firstName = document.getElementById("firstName");
let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
let lastName = document.getElementById("lastName");
let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
let address = document.getElementById("address");
let addressErrorMsg = document.getElementById("addressErrorMsg");
let city = document.getElementById("city");
let cityErrorMsg = document.getElementById("cityErrorMsg");
let email = document.getElementById("email");
let emailErrorMsg = document.getElementById("emailErrorMsg");
let input = document.querySelectorAll("input");

// Expressions regulieres
let Regex = new RegExp("^[a-zA-Zéèàêîôâ ,.'-]+$"); // ville et prénom/nom
let addressRegex = new RegExp("^[0-9a-zA-Z]{1,3}[a-z A-Z-'-éèàçêîôâ]{1,20}$");
let emailRegex = new RegExp(
  "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
);

//Fonctions
render();


//Affichage des produits sur la page

function render() {
  console.log(cart);

  if (cart !== null) {
    cart.forEach((item) => {
      let itemId = item.id;
      getapi(itemId, item);
    });
  } else {
    window.alert("cart is empty");
  }
}

//Récupération des données non stockées en local (prix)
async function getapi(id, item) {
  const response = await fetch(`${apiURL}/${id}`).catch(function (err) {
    console.error(error);
  });

  let data = await response.json();
  console.log(data);

  renderCartitems(data, item);
  quantite();
}

//Affichage des articles sélectionnés dans le panier et du prix/quantité totale
function renderCartitems(data, item) {
  document.getElementById(
    "cart__items"
  ).innerHTML += `<article class="cart__item" data-id="${item.id}" data-color="${item.colors}">
        <div class="cart__item__img">
          <img src="${item.imgsrc}" alt="${item.imgalt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${item.name}</h2>
            <p>${item.colors}</p>
            <p>${data.price}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;

  total(data.price, item.quantity);
  
  suppressionArticle();
}

// Listes des quantités et prix des articles du panier
let tabPrice = [];
let tabQuantite = [];

// Prix et quantité totale
function total(price, quantite) {
  console.log("Prix unitaire :", price);
  console.log("Quantité :", quantite);
  let totalQuantity = document.getElementById("totalQuantity");
  let totalPrice = document.getElementById("totalPrice");
  let totalQ = 0;
  let totalP = 0;
  let QNumber = Number(quantite);
  tabPrice.push({ price });
  tabQuantite.push({ QNumber });
  console.log(tabPrice);
  console.log(tabQuantite);

  for (let key in tabPrice) {
    console.log(tabPrice[key].price);
    totalP += tabQuantite[key].QNumber * tabPrice[key].price;
    totalQ += tabQuantite[key].QNumber;
  }
  console.log("Le prix total est maintenant de:", totalP);
  console.log("Il y a maintenant", totalQ, "articles dans le panier");

  totalQuantity.innerHTML = totalQ;
  totalPrice.innerHTML = totalP;
}

// modification de la quantité des articles

function quantite() {
  //quantité modifiable de l'article
  let modify = document.querySelectorAll(".itemQuantity");

  for (let i = 0; i < modify.length; i++) {
    modify[i].addEventListener("change", () => {
      // id + quantité + couleur des articles affichés
      let _ID = modify[i].closest("article").dataset.id;
      let _COLOR = modify[i].closest("article").dataset.color;
      let _QUANTITY = modify[i].value;

      // Retrouve le produit du panier correspondant
      let produit = cart.find(
        (element) => element.id == _ID && element.colors == _COLOR
      );
      produit.quantity = _QUANTITY;
      cart[i].quantity = produit.quantity;
      totalQuantity.innerText = produit.quantity;
      // Met à jour le panier
      localStorage.setItem("obj", JSON.stringify(cart));
      //Refresh de la page
      location.reload();
    });
  }
}

function suppressionArticle() {
  // bouton de suppression
  let deleteItem = document.querySelectorAll(".deleteItem");

  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener("click", () => {
      // id + couleur des articles affichés
      let _ID = deleteItem[i].closest("article").dataset.id;
      let _COLOR = deleteItem[i].closest("article").dataset.color;

      // Retrouve le produit du panier correspondant
      cart = cart.filter(
        (element) => element.id !== _ID || element.colors !== _COLOR
      );
      // Met à jour le panier sans le produit correspondant
      localStorage.setItem("obj", JSON.stringify(cart));
      //Refresh de la page
      location.reload();
    });
  }
}

function verify() {
  // Prénom
  validfirstName();
  function validfirstName() {
    console.log(firstName.value);
    if (firstName.value.length == 0) {
      firstNameErrorMsg.innerHTML = "merci de renseigner ce champ !";
    } else if (Regex.test(firstName.value)) {
      firstNameErrorMsg.innerHTML = "";
      return true;
    } else {
      firstNameErrorMsg.innerHTML = "merci de vérifier ce champ !";
      return false;
    }
  }
  firstName.addEventListener("change", () => {
    console.log(firstName.value);
    validfirstName();
  });

  //Nom
  validlastName();
  function validlastName() {
    console.log(lastName.value);
    if (lastName.value.length == 0) {
      lastNameErrorMsg.innerHTML = "merci de renseigner ce champ !";
    } else if (Regex.test(lastName.value)) {
      lastNameErrorMsg.innerHTML = "";
      return true;
    } else {
      lastNameErrorMsg.innerHTML = "merci de vérifier ce champ !";
      return false;
    }
  }
  lastName.addEventListener("change", () => {
    console.log(lastName.value);
    validlastName();
  });

  // Adresse
  validaddress();
  function validaddress() {
    console.log(address.value);
    if (address.value.length === 0) {
      addressErrorMsg.innerHTML = "merci de renseigner ce champ !";
    } else if (addressRegex.test(address.value)) {
      addressErrorMsg.innerHTML = "";
      return true;
    } else {
      addressErrorMsg.innerHTML = "merci de vérifier ce champ !";
      return false;
    }
  }
  address.addEventListener("change", () => {
    console.log(address.value);
    validaddress();
  });

  // Ville
  validcity();
  function validcity() {
    if (city.value.length == 0) {
      cityErrorMsg.innerHTML = "merci de renseigner ce champ !";
    } else if (Regex.test(city.value)) {
      cityErrorMsg.innerHTML = "";
      return true;
    } else {
      cityErrorMsg.innerHTML = "merci de vérifier ce champ !";
      return false;
    }
  }
  city.addEventListener("change", () => {
    console.log(city.value);
    validcity();
  });

  // email
  validemail();
  function validemail() {
    if (email.value.length == 0) {
      emailErrorMsg.innerHTML = "merci de renseigner ce champ !";
    } else if (emailRegex.test(email.value)) {
      emailErrorMsg.innerHTML = "";
      return true;
    } else {
      emailErrorMsg.innerHTML = "merci de vérifier ce champ !";
      return false;
    }
  }
  email.addEventListener("change", () => {
    console.log(email.value);
    validemail();
  });

  // Vérification de chaque champ
  if (
    validfirstName() &
    validlastName() &
    validaddress() &
    validcity() &
    validemail()
  ) {
    return true;
  } else {
    return false;
  }
}

function order() {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    //Crée un tableau avec les id des produit present dans localStorage
    let id = [];
    console.log(cart);
    if (cart !== null) {
      if (cart.length >= 1) {
        for (let i = 0; i < cart.length; i++) {
          id.push(cart[i].id);
        }
      } else {
        alert("le panier est vide !");
      }
    }

    console.log(id);
    // crée un tableau contact et y ajoute le tableau des produits
    const tab = {
      contact: {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
      },
      products: id,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(tab),
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
    };
    // envoie de l'objet contact et du tableau des id de chaque produit present lors de la commande
    console.log(verify());
    if (verify()) {
      if (cart !== null) {
        if (cart.length >= 1) {
          fetch("http://localhost:3000/api/products//order", options)
            .then((response) =>response.json())

            .then((res) => {
              console.log(res.orderId);

              if (verify()) {
                localStorage.clear();
                document.location.href =
                  "confirmation.html?orderId=" + res.orderId;
              }
            })

            .catch((error) => {
              console.log("error :" + error);
            });
        }
      }
    }
  });
}

order();