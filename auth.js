// Get references to HTML elements
const loginForm = document.getElementById("loginForm");
const logoutBtn = document.getElementById("logoutBtn");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "your_username" && password === "your_password") {
    const crypto = require("crypto");

    const salt = crypto.randomBytes(16).toString("hex");

    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 100000, 64, "sha256")
      .toString("hex");
    // crypto.createHash('sha256')

    console.log("Hashed Password:", hashedPassword);

    // Successful login
    alert("Login successful");
    loginForm.style.display = "none"; // Hide login form
    logoutBtn.style.display = "inline"; // Show logout button
  } else {
    // Invalid credentials
    alert("Invalid username or password");
  }
});

// Add event listener for logout button
logoutBtn.addEventListener("click", function () {
  loginForm.style.display = "block"; // Show login form
  logoutBtn.style.display = "none"; // Hide logout button
  document.getElementById("username").value = ""; // Clear username field
  document.getElementById("password").value = ""; // Clear password field
});

// <!DOCTYPE html>
// <html>
// <head>
//   <title>Login/Logout Example</title>
//   <script src="script.js"></script>
// </head>
// <body>
//   <h2>Login</h2>
//   <form id="loginForm">
//     <label for="username">Username:</label>
//     <input type="text" id="username" required><br>
//     <label for="password">Password:</label>
//     <input type="password" id="password" required><br>
//     <input type="submit" value="Login">
//   </form>

//   <button id="logoutBtn" style="display: none;">Logout</button>
// </body>
// </html>
