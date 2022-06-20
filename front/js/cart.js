//variables
let cartList = localStorage.getItem("cart");
let cart = JSON.parse(cartList);
let totalArticles = document.getElementById("totalQuantity");
console.log(cart);

//Fonctions
renderCartitems();

//Evenements


//Affichage des articles sélectionnés dans le panier
function renderCartitems() {
  cart.forEach((item) => {
    document.getElementById(
      "cart__items"
    ).innerHTML += `<article class="cart__item" data-id="${item.id}" data-color="${item.color}">
        <div class="cart__item__img">
          <img src="${item.imgsrc}" alt="${item.imgalt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${item.name}</h2>
            <p>${item.color}</p>
            <p>${item.price}</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.number}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
  });
}

//Calcul de la quantité totale d'articles dans le panier
let cartQuantity = 0;
let finalQuantity = 0;
  cart.forEach((item) => {
      cartQuantity += item.number;
  });
  totalArticles.innerText = cartQuantity ;

  let currentQuantity = document.querySelectorAll(".itemQuantity");


  currentQuantity.forEach(article => {
    article.addEventListener('change', function totalQuantity(){
      console.log(article.value);
      if (article.value++) {
        cartQuantity ++;
      }
      totalArticles.innerText = cartQuantity ;
    }); 
  });

//Calcul du prix total des articles du panier
function totalPrice() {
  let total = 0;
  cart.forEach((item) => {
    total += item.price;
  });
  document.getElementById("totalPrice").textContent = total;
}

//Affichage de la quantité et du prix total de la commande
function total() {
  totalPrice();
  totalQuantity();
}






