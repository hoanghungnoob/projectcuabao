window.onload = function () {

  const header = document.createElement("div");
  header.innerHTML = `
  <div class="header" id="header">
  <!-- navbar -->
  <nav class="navbar">
    <!-- logo -->
    <div class="navbar_logo">
      <div id="logo"></div>
    </div>
    <!-- search -->
    <div class="search-container">
      <input class="search-container__input" type="text" placeholder="Tìm kiếm..." required>
      <button type="submit"><i style="font-size: 20px;" class="fa fa-search"></i></button>
    </div>
    <!-- elements of navbar -->
    <span style="font-size:30px;cursor:pointer" id="open_sideBar" onclick="openNav()">&#9776;</span>
    <div id="opacity" onclick="closeNav()"></div>

    <ul class="navbar__ul">
      <!-- all element choose -->
      <li><a href="/page/home/home.html"><i class="fas fa-home"></i>Home</a></li>
      <li><a href="/page/contact_us/contact_us.html"><i class="fas fa-envelope"></i>Contact Us</a></li>
      <li><a href="/page/order/order.html"><i class="fas fa-shopping-cart"></i>Order</a></li>
      <li><a href="/page/purcha_list/purcha_list.html"><i class="fas fa-history"></i>History</a></li>
      <li class="dropdown" id="management">
        <a href="#" class="dropdown-link" >
          <i class="fas fa-cog"></i> Management
        </a>
        <ul class="dropdown-menu">
          <li><a href="/page/customer/CustomerList/CustomerList.html">Customer</a></li>
          <li><a href="/page/product/ProductList/ProductList.htm">Product</a></li>
        </ul>
      </li>
      <li class="navbar__li--mobile" id="login"><a href="/page/login/login.html"><button>Login</button></a></li>
      <li class="navbar__li--mobile">
        <div class="border2">
          <a class="navbar__li__a" href="/page/register/register.html" id="sign_up"><button>Sign up</button></a>
        </div>
      </li>
      <!-- profile -->
      <li class="profile" id="profile">
      <a href="/page/customer/profile/profile.html">
      
      <img src="/images/img_icon/user-removebg-preview.png" alt="Profile Picture" id="avata_layout" class="profile__picture">
      
      </a>

        
    </li>
      <!-- logout -->
      <li class="navbar__li--mobile">
        <a><button onclick="logout()" id="log_out">Logout</button></a>
      </li>
    </ul>
  </nav>
</div>
    `;
  document.body.insertBefore(header, document.body.firstChild);
  document.getElementById('log_out').style.display = "none";
  document.getElementById('profile').style.display = "none";
  document.getElementById('management').style.display = "none";
  const userId = localStorage.getItem('userId');
console.log(userId)

function fetch_cus() {
  fetch(`http://localhost:3000/customer/${userId}`)
    .then(response => response.json())
    .then(customer => {
        document.getElementById('avata_layout').src = customer.avata;
    });
}
fetch_cus();

  const footer = document.createElement("div");
  footer.innerHTML = `
    <div class="footer" id="footer">
    <div class="row-first">
        <div class="row-first-content"><img src="/images/img_icon/logo_coffe.svg" alt=""></div>
    </div>
    <div class="row-final">
        <div class="menu-footer">
            <div class="menu-footer-item">
                <div class="footer-item-heading">Type of coffee</div>
                <div class="footer-item-paragrap">Mocha</div>
                <div class="footer-item-paragrap">CapAmericano</div>
                <div class="footer-item-paragrap">Latte</div>
                <div class="footer-item-paragrap">Other</div>
            </div>
            <div class="menu-footer-item">
                <div class="footer-item-heading">About Us</div>
                <div class="footer-item-paragrap">Contact Us: 0333775890 - 03488859302 - 01234947232</div>
                <div class="footer-item-paragrap">Branch: 101B Le Huu Trac, Phuoc My, Son Tra, Da Nang</div>
                <div class="footer-item-paragrap">Address: 445-421 ĐT607, Hoa Hai, Ngu Hanh Son, Da Nang</div>
                <div class="footer-item-paragrap">My team: Pham Gia Bao - Ho Thi Mai - Ho Thi Hue - Nguyen Thi Kim
                    Tuyen</div>
                <div class="footer-item-paragrap">Mentor: Nguyen The Quy</div>
            </div>
            <div class="menu-footer-item">
                <div class="footer-item-heading">Follow Us</div>
                <div class="footer-item-paragrap"><i class="fa-brands fa-instagram icon-footer"></i>Instagram</div>
                <div class="footer-item-paragrap"><i class="fa-brands fa-facebook icon-footer"></i>Facebook</div>
                <div class="footer-item-paragrap"><i class="fa-brands fa-twitter icon-footer"></i>Twitter</div>
            </div>
        </div>
        <div class="footer-content1">We aim to provide a great time for everyone</div>
        <div class="footer-content2">Coffee suitable for you</div>
    </div>
</div>

    `;
  document.body.appendChild(footer);
  // Lấy giá trị roleId từ local storage
  const roleId = localStorage.getItem("roleId");
  if(roleId === '1'){

    document.getElementById('profile').style.display = "block";
    document.getElementById('log_out').style.display = "block";   
    document.getElementById('sign_up').style.display = "none";
    document.getElementById('login').style.display = "none";
  document.getElementById('management').style.display = "block";


  }

  // Kiểm tra giá trị roleId và ẩn các phần tử tương ứng khi roleId là 2
  if (roleId === "2") {
    const managementElement = document.querySelector(".dropdown");
    const loginElement = document.querySelector(".navbar__li--mobile a[href='/page/login/login.html']");
    const signUpElement = document.querySelector(".navbar__li--mobile .border2");
    document.getElementById('profile').style.display = "block";
    document.getElementById('log_out').style.display = "block";

    // Ẩn phần tử "Management"
    if (managementElement) {
      managementElement.style.display = "none";
    }

    // Ẩn phần tử "Login"
    if (loginElement) {
      loginElement.style.display = "none";
    }

    // Ẩn phần tử "Sign up"
    if (signUpElement) {
      signUpElement.style.display = "none";
    }
  }
};

