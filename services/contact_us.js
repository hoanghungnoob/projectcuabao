function saveUser(event) {
  event.preventDefault();

  const userId = document.querySelector("#userId").value;
  const nameCustomer = document.getElementById("name").value;
  const emailCustomer = document.getElementById("email").value;
  const phoneCustomer = document.getElementById("phone").value;
  const messageCustomer = document.getElementById("message").value;

  const url = userId ? `https://coffee-web-api.onrender.com/contacts/${userId}` : "https://coffee-web-api.onrender.com/contact";
  const method = userId ? "PUT" : "POST";
  const data = {
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
        alert("Successfully Sent!")
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Sending Failed!',
          text: 'Thank you for contacting us.',
          showConfirmButton: false,
          timer: 3000
        });
      }
    })
    .catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Sending Failed!',
        text: 'Thank you for contacting us.',
        showConfirmButton: false,
        timer: 3000
      });
    });
}

const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", saveUser);


