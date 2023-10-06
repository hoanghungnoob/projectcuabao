function saveUser(event) {
  event.preventDefault();

  const userId = document.querySelector("#userId").value;
  const nameCustomer = document.getElementById("name").value;
  const emailCustomer = document.getElementById("email").value;
  const phoneCustomer = document.getElementById("phone").value;
  const messageCustomer = document.getElementById("message").value;

  const url = userId ? `http://localhost:3000/contact/${userId}` : "http://localhost:3000/contact";
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
        Swal.fire({
          icon: 'success',
          title: 'Successfully Sent!',
          text: 'Thank you for contacting us.',
          showConfirmButton: true,
          timer: 3000
        });
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