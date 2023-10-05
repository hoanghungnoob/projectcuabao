function fetchCustomer() {
  fetch("http://localhost:3000/customer")
    .then((res) => res.json())
    .then((data) => {
      const productList = data;
    });
}
function saveUser(event) {
  var check = false;
  event.preventDefault();
  const userId = document.querySelector("#userId").value;
  const nameCustomer = document.getElementById("name").value;
  const emailCustomer = document.getElementById("email").value;
  const phoneCustomer = document.getElementById("phone").value;
  const messageCustomer = document.getElementById("message").value;

  if (userId) {
    fetch(`http://localhost:3000/contact/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameCustomer,
        phoneNumber: phoneCustomer,
        email: emailCustomer,
        message: messageCustomer,
      }),
    })
      .then((response) => {
        if (response.ok) {
          document.getElementById('successMessage').style.display = "block";
          check = true;
        } else {
          document.getElementById('errorMessage').style.display = "block";
          check = false;

        }
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById('errorMessage').style.display = "block";
        check = false;

      });
  } else {
    fetch("http://localhost:3000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameCustomer,
        phoneNumber: phoneCustomer,
        email: emailCustomer,
        message: messageCustomer,
      }),
    })
      .then((response) => {
        if (response.ok) {
          document.getElementById('successMessage').style.display = "block";
          check = true;

        } else {
          document.getElementById('errorMessage').style.display = "block";
          check = false;

        }
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById('errorMessage').style.display = "block";
        check = false;

      });
  }
}

fetchCustomer();

const contactForm = document.getElementById("contactForm");
contactForm.addEventListener("submit", saveUser);


