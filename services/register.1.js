function register() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("con_password").value;
    var rememberPassword = true;
    if (email === "" || password === "" || confirmPassword === "") {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp.");
        return;
    }
    var registerData = {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        rememberPassword: rememberPassword
    };
    fetch("http://localhost:3004/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(registerData)
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert("Đăng ký thành công!");
        })
        .catch(error => {
            console.error(error);
            alert("Đăng ký thất bại.");
        });
}
