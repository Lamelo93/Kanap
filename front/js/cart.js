//variables
const apiURL = "http://localhost:3000/api/products";
let cartList = localStorage.getItem("obj");
let cart = JSON.parse(cartList);
let totalQuantity = document.getElementById("totalQuantity") ;
let cartItems = document.querySelectorAll(".cart__item");
let itemQuantity = document.querySelectorAll(".itemQuantity");
let cartQuantity = 0;
let tabPrice = [];
 let tabQuantite = [];

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

//Récupération des données non stockées en local
async function getapi(id, item) {
  const response = await fetch(`${apiURL}/${id}`).catch(function (err) {
    console.error(error);
  });

  let data = await response.json();
  console.log(data);

  renderCartitems(data, item);
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
      modifieQ();
      suppressionArticle();
      
}

/*itemQuantity.forEach(item => {
   
  item.addEventListener('change', function total(){
    cartQuantity += Number(item.value);
    
  });
});*/

/**
 * calcul le prix et la quantité total 
 */
 
 function total(price, quantite) {
     console.log('price', price);
     console.log('quantité', quantite);
     let quantityTotal = document.getElementById('totalQuantity');
     let prixTotal = document.getElementById('totalPrice');
     let totalQ = 0;
     let totalP = 0;
     let QNumber = Number(quantite);
     tabPrice.push({ price });
     tabQuantite.push({ QNumber })
     console.log(tabPrice);
     console.log(tabQuantite);
 
     for (let key in tabPrice) {
         console.log(tabPrice[key].price)
         totalP += (tabQuantite[key].QNumber * tabPrice[key].price);
         totalQ += tabQuantite[key].QNumber;
     }
     console.log(totalP);
     console.log(totalQ);
 
 
     quantityTotal.innerHTML = totalQ;
     prixTotal.innerHTML = totalP;
 
 };

// modifie la quantité

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
          let produit = cart.find(element => element.id == _ID && element.colors == _COLOR);
          produit.quantity = _QUANTITY;
          cart[i].quantity = produit.quantity;
          totalQuantity.innerText = produit.quantity;
          localStorage.setItem("obj", JSON.stringify(cart));
          location.reload();

      })
  }
  
};

function suppressionArticle() {

  let deleteItem = document.querySelectorAll('.deleteItem');

  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener('click', () => {
        // récuperer l'id, la couleur et la quantity
        let _ID = deleteItem[i].closest("article").dataset.id;
        let _COLOR = deleteItem[i].closest("article").dataset.color;
        
        
        // renvoie le produit qui contient l'id et la couleur 
        cart = cart.filter(element => element.id !== _ID || element.colors !== _COLOR);
        localStorage.setItem("obj", JSON.stringify(cart));
        location.reload();

    })
}

}

