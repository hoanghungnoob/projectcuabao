function login() {
  const form = document.getElementById("loginForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get user input values
    const emailInput = document.getElementById("input_name").value;
    const passwordInput = document.getElementById("input_password").value;

    fetch("http://localhost:3000/customer")
      .then(response => response.json())
      .then(data => {
        console.log(data);

        const loggedInUser = data.find(user => user.name === emailInput && user.password === passwordInput);

        console.log(loggedInUser)

        console.log(loggedInUser.name)
        console.log(loggedInUser.roleId)
        if (loggedInUser.roleId === 1) {
          // Redirect to home page for role 1
          // window.location.href = "/page/home/home.html";
        } else if (loggedInUser.roleId === 2) {
          // Redirect to home page for role 2
          window.location.href = "/page/home/home.html";
          con
          
        }


      })
  })
}

// Call the login function
login();