//variables
let params = new URLSearchParams(window.location.search);
let elements = [document.getElementsByClassName("item_img"),
                document.getElementById("price"),
                document.getElementById("colors")];


//modifier html
console.log(params.get("id"));