//variables
const apiURL = "http://localhost:3000/api/products";
let cartList = localStorage.getItem("obj");
let cart = JSON.parse(cartList);
let totalQuantity = document.getElementById("totalQuantity");
let cartItems = document.querySelectorAll(".cart__item");
console.log(cart);
console.log(totalQuantity.textContent);

//Fonctions
async function getapi(id) {
  const response = await fetch(`${apiURL}/${id}`) .catch (function(err) {
    console.error(error);
  });

  let data = await response.json();
  console.log(data);

 
  
}




//Affichage des articles sélectionnés dans le panier
function renderCartitems(data) {

  
  cart.forEach((item) => {

  getapi(item.id)
  



    document.getElementById(
      "cart__items"
    ).innerHTML += `<article class="cart__item" data-id="${article.id}" data-color="${item.colors}">
        <div class="cart__item__img">
          <img src="${item.imgsrc}" alt="${item.imgalt}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${item.name}</h2>
            <p>${item.colors}</p>
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
let itemQuantity = document.querySelectorAll(".itemQuantity");
let cartQuantity = 0;

/*cart.forEach((item) => {
  cartQuantity += item.number;
});*/

/*itemQuantity.forEach(item => {
   
  item.addEventListener('change', function total(){
    cartQuantity += Number(item.value);
    totalQuantity.innerText += item.value - cartQuantity ;
  });
});*/

/*cart.forEach((item) => {
  cartQuantity += Number(item.number);
  totalQuantity.innerText = cartQuantity;
});*/

//Calcul du prix total des articles du panier
/*function totalPrice() {
  let total = 0;
  cart.forEach((item) => {
    total += item.price * item.number;
  });
  document.getElementById("totalPrice").textContent = total;
}*/

function modifieQ() {

  let modify = document.querySelectorAll('.itemQuantity');
  // se repete tant qu'il y a des produit dans le panier 
  for (let i = 0; i < modify.length; i++) {
      modify[i].addEventListener('change', () => {
          // récuperer l'id, la couleur et la quantity
          let _ID = modify[i].closest("article").dataset.id;
          let _COLOR = modify[i].closest("article").dataset.color;
          let _QUANTITY = modify[i].value;
          // renvoie le produit qui contient l'id et la couleur 
          let produit = cart.find(element => element._id == _ID && element.colors == _COLOR);
          produit.quantity = _QUANTITY;
          cart[i].quantity = produit.quantity;
          localStorage.setItem("obj", JSON.stringify(cart));

          location.reload();

      })
  }
}

modifieQ();
