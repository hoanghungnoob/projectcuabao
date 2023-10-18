function validation(){
    if(document.Formfill.userName.value==""){
        document.getElementById("result").innerHTML="Enter Username";
        return false;
    }else if(document.Formfill.userName.value.length<=6){
        document.getElementById("result").innerHTML="Atleast 6 letter";
        return false;
    }else if(document.Formfill.Email.value==""){
        document.getElementById("result").innerHTML="Enter your Email";
        return false;
    }else if(document.Formfill.Password.value==""){
        document.getElementById("result").innerHTML="Enter your Password";
        return false;
    }else if( document.Formfill.Con_password.value==""){
        document.getElementById("result").innerHTML="Enter Confirm Password";
        return false;
    }else if(document.Formfill.Password.value !== document.Formfill.Con_password.value){
        document.getElementById("result").innerHTML="Passsword doesn't matched";
        return false;
    }else if(document.Formfill.Password.value.length<=6){
        document.getElementById("result").innerHTML="Password must be 6-digits";
        return false;
    }else if(document.Formfill.Password.value == document.Formfill.Con_password.value){
        popup.classList.add("open-slize");
        return false;
    }
}

var popup =document.getElementById("popup");
function closeSlize(){
    popup.classList.remove('open-slize');
}





// function register() {    
//     var email = document.getElementById("email").value;
//     var password = document.getElementById("password").value;
//     var confirmPassword= document.getElementById("con_password").value;
//     var rememberPassword = true;
//     if (email === "" || password === "" || confirmPassword === "") {
//         alert("Vui lòng điền đầy đủ thông tin.");
//         return;
//     }

//     if (password !== confirmPassword) {
//         alert("Mật khẩu xác nhận không khớp.");
//         return;
//     }
//     fetch("  http://localhost:3000/register", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(registerData)
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         alert("Đăng ký thành công!");
//     })
//     .catch(error => {
//         console.error(error);
//         alert("Đăng ký thất bại.");
//     });
// }