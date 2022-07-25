const params = new URLSearchParams(window.location.search);
let orderId = params.get("orderId");
let orderNumber = document.getElementById("orderId");
orderNumber.innerText = orderId;