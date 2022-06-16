//variables
let cartList = localStorage.getItem("cart");
let cart = JSON.parse(cartList);
console.log(cart);
let product = document.getElementsByClassName("cart__item");


function renderCartitems() { 
    cart.forEach((item) => {
        
        document.getElementById("cart__items").innerHTML += `<article class="cart__item" data-id="${item.id}" data-color="${item.color}">
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
      </article>`
    });
};

function totalQuantity() {
    let quantity = 0;
    cart.forEach((item) => {
        quantity += item.number;
    });

    document.getElementById("totalQuantity").textContent = quantity;
};

function totalPrice() {
    let total = 0;
    cart.forEach((item) => {
        total += item.price;
    });
    document.getElementById("totalPrice").textContent = total;
};


//Modifier
function addMore() {
    quantity++;
}

totalPrice();
totalQuantity();
renderCartitems();
let quantities = document.querySelector("input[name ='itemQuantity']");
console.log(quantities.value);