
function getUserData() {
  let userData;
  const hashKey = "Abcd123@";
  const token = localStorage.getItem("token");

  const decryptedUserInfo = CryptoJS.AES.decrypt(token, hashKey).toString(
    CryptoJS.enc.Utf8
  );

  if (decryptedUserInfo) {
    userData = JSON.parse(decryptedUserInfo);
  }

  return userData;
}

console.log(getUserData().id)
function saveUser() {


  const userData = getUserData();
  if (!userData || !userData.id) {
    // handle missing data
    return;
  }

  const nameCustomer = document.getElementById("name").value;
  const emailCustomer = document.getElementById("email").value;
  const phoneCustomer = document.getElementById("phone").value;
  const messageCustomer = document.getElementById("message").value;

  const url = `https://coffee-web-api-dkrq.onrender.com/contacts`;
  const method = "POST";
  const data = {
    id_customer: userData.id,
    name: nameCustomer,
    phoneNumber: phoneCustomer,
    email: emailCustomer,
    message: messageCustomer,
  };

  fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        alert("Successfully Sent!");
      } else {
        Swal.fire({
          icon: "error",
          title: "Sending Failed!",
          text: "Thank you for contacting us.",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Sending Failed!",
        text: "Thank you for contacting us.",
        showConfirmButton: false,
        timer: 3000,
      });
    });
}

