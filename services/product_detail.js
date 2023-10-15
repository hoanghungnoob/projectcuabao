function increment() {
    var inputQty = document.getElementById('input__qty');
    var currentQty = parseInt(inputQty.value) || 1;
    var newQty = currentQty + 1;
    if (newQty < 1) {
        newQty = 1;
    }
    inputQty.value = newQty;
}

function decrement() {
    var inputQty = document.getElementById('input__qty');
    var currentQty = parseInt(inputQty.value) || 1;
    var newQty = currentQty - 1;
    if (newQty < 1) {
        newQty = 1;
    }
    inputQty.value = newQty;
}

// JavaScript code
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
function detail() {
   

fetch("http://localhost:3000/product")
    .then((res) => res.json())
    .then((data) => {
        var product = false;
        data.forEach(element => {
            if (productId == element.id) {
                product = true;
                if (product) {
                    document.getElementById('product__name').innerHTML = element.name;
                    document.getElementById('main__img').src = element.image1;
                    document.getElementById('item__img1').src = element.image2;
                    document.getElementById('item__img2').src = element.image3;
                    document.getElementById('item__img3').src = element.image1;
                    document.getElementById('new__price').innerHTML = element.newPrice + " VND";
                    document.getElementById('old__price').innerHTML = element.oldPrice + " VND";
                    document.getElementById('describe').innerHTML = element.description;
                    // Đánh giá sản phẩm (từ 1 đến 5)

                    var rating = element.productReviews; 
                    console.log(rating)
                    // Đây chỉ là ví dụ, bạn có thể thay đổi giá trị này.

                        var rating = element.productReviews;
                        var stars = document.getElementsByClassName("star");
                        for (var i = 0; i < rating; i++) {
                            stars[i].classList.add("selected");
                        }

                        document.getElementById("product__btn__buy").addEventListener("click", function() {
                            var quantity = document.getElementById("input__qty").value;
                            var orderUrl = "/page/order/order.html?id=" + element.id + "&quantity=" + quantity;
                            var orderUrl1 = "/page/product/ProductDetail/ProductDetail.html?id=" + element.id;


                            window.location.href = orderUrl;
                        });
                    } else {
                        document.getElementById("product-detail").innerHTML = "Product not found.";
                    }
                }
            });
        });
}

detail();

function choise_product(imgs) {
        main__img.src = imgs.src;
}


// Get all like and dislike buttons
const likeButtons = document.querySelectorAll('.like-button');
const dislikeButtons = document.querySelectorAll('.dislike-button');

// Attach click event listener to each like button
likeButtons.forEach(likeButton => {
  likeButton.addEventListener('click', () => {
    likeButton.classList.add('clicked');
    dislikeButtons.forEach(dislikeButton => {
      dislikeButton.classList.remove('clicked');
    });
  });
});

// Attach click event listener to each dislike button
dislikeButtons.forEach(dislikeButton => {
  dislikeButton.addEventListener('click', () => {
    dislikeButton.classList.add('clicked');
    likeButtons.forEach(likeButton => {
      likeButton.classList.remove('clicked');
    });
  });
});




function loadContent(page) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        document.getElementById("content").innerHTML = this.responseText;
      } else {
        console.error("Error loading page:", this.status, this.statusText);
      }
    }
  };
  xhttp.open("GET", page, true);
  xhttp.send();
}

