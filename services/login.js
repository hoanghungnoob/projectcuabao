 
        const form = document.getElementById("loginForm");
        form.addEventListener("submit", function(event) {
            event.preventDefault(); 

            // Lấy giá trị nhập từ người dùng
            const emailInput = document.getElementById("input_name").value;
            const passwordInput = document.getElementById("input_password").value;
        })

        fetch("http://localhost:3000/customer")
        .then(response => response.json())
        .then(data => {
            const user = data;
            console.log(user)
            // const loggedInUser = user.find(user => user.email === emailInput && user.password === passwordInput);

            // if (loggedInUser) {
            //    alert("Đăng nhập thành công");
            //    window.location.href="homepages.html";
                
            // } else {
            //     alert("Sai thông tin đăng nhập");
                
            // }
        })
        // .catch(error => {
        //     alert("Lỗi khi tải dữ liệu người dùng:", error);
        // });
