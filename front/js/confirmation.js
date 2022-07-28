//Variables
const params = new URLSearchParams(window.location.search);
let orderId = params.get("orderId");
let orderNumber = document.getElementById("orderId");
//Afficher le numéro de commande
orderNumber.innerText = orderId;