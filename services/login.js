function login() {
    const form = document.getElementById("loginForm");
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      // Lấy giá trị nhập từ người dùng
      const emailInput = document.getElementById("input_name").value;
      const passwordInput = document.getElementById("input_password").value;
  
      fetch("http://localhost:3000/customer")
        .then(response => response.json())
        .then(data => {
          const users = data;
          const loggedInUser = users.find(user => user.name === emailInput && user.password === passwordInput);
        
          
          if (loggedInUser) {
            if (loggedInUser.roleId === 1) {
            //   window.location.href = "/page/home/home.html?roleId=1";
              console.log('hello')
              
            } else if (loggedInUser.roleId === 2) {
              console.log('loi')

            //   window.location.href = "/page/home/home.html?roleId=2";
            }
          } else {
            alert("Sai thông tin đăng nhập");
          }
        })
        .catch(error => {
          alert("Lỗi khi tải dữ liệu người dùng: " + error);
        });
    });
  }
  
  // Gọi hàm đăng nhập
  login();