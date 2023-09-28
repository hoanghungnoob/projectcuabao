function increment() {
    var inputQty = document.getElementById('input__qty');
    var currentQty = parseInt(inputQty.value) || 0;
    var newQty = currentQty + 1;
    inputQty.value = newQty;

}

function decrement() {
    var inputQty = document.getElementById('input__qty');
    var currentQty = parseInt(inputQty.value) || 0;
    var newQty = currentQty - 1;
    if (newQty < 0) {
        newQty = 0;
    }
    inputQty.value = newQty;

}

// JavaScript code
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch("/database/db.json")
    .then((res) => res.json())
    .then((data) => {
        var product = false;
        const productList = data.product;
        data.product.forEach(element => {
            if (productId == element.id) {
                product = true;
                var productDetailHTML = '';

                if (product) {
                    document.getElementById('product__name').innerHTML = element.name;
                    document.getElementById('main__img').src = element.image1;
                    document.getElementById('item__img1').src = element.image2;
                    document.getElementById('item__img2').src = element.image3;
                    document.getElementById('item__img3').src = element.image1;
                    document.getElementById('new__price').innerHTML = "$" + element.newPrice ;
                    document.getElementById('old__price').innerHTML ="$" +  element.oldPrice;

                    document.getElementById('describe').innerHTML = element.description;

                } else {
                    document.getElementById("product-detail").innerHTML = "Product not found.";
                }
            }

        });
    });

