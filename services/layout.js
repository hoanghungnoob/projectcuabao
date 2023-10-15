window.onload = function() {
    const header = document.createElement("div");
    header.innerHTML = `
    <div class="header" id="header">
    <!-- navber -->
    <nav class="navbar">
        <!-- logo -->
        <div class="navbar_logo">
            <div id="logo"></div>
        </div>
        <!-- search  -->
        <div class="search-container">
            <input class="search-container__input" type="text" placeholder="Tìm kiếm..." required>
            <button type="submit"><i style="font-size: 20px;" class="fa fa-search"></i></button>
        </div>
        <!-- elements of navbar -->
        <span style="font-size:30px;cursor:pointer" id="open_sideBar" onclick="openNav()">&#9776;</span>
        <div id="opacity" onclick="closeNav()"></div>
        
        <ul class="navbar__ul">
            <!-- all element choose -->
            <li> <a href="/page/home/home.html" ><i class="material-symbols-outlined">home</i>Home</a></li>
            <li> <a href="/page/contact_us/contact_us.html"><i class="material-symbols-outlined">call</i>Contact
                Us</a></li>
                <li> <a href="/page/order/order.html"><i class="material-symbols-outlined">shopping_cart</i>Order</a></li>
                <li> <a href="/page/purcha_list/purcha_list.html"><i class="material-symbols-outlined">history</i>History</a></li>
                <li class="dropdown">
                <a href="#" class="dropdown-link">
                  <i class="fas fa-cog"></i> Management
                </a>
                <ul class="dropdown-menu">
                  <li><a href="/page/customer/CustomerList/CustomerList.html">Customer</a></li>
                  <li><a href="/page/product/ProductList/ProductList.htm">Product</a></li>
                </ul>
              </li>
              </li>             
                 <li class="navbar__li--mobile"> <a href="/page/login/login.html" ><i class="material-symbols-outlined">login</i>Login</a></li>
            <li class="navbar__li--mobile">
                <div class="border2">
                    <a class="navbar__li__a" href="#"><i class="material-symbols-outlined">person_add</i>Sign up</a>
                </div>
            </li>
        </ul>
    </nav>
</div>
    `;
    document.body.insertBefore(header, document.body.firstChild);

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
<script src="/services/order.js"></script>
<script src="/services/customer.js"></script>
    `;
    document.body.appendChild(footer);
};