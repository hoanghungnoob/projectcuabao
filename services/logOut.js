function logout() {
  Swal.fire({
    icon: "info",
    title: "Confirm Logout",
    text: "Are you sure you want to log out?",
    showCancelButton: true,
    confirmButtonText: "Logout",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  })
    .then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
      }
    })
    .then(() => {
      document.getElementById("log_out").style.display = "none";
      window.location.href = "/page/login/login.html";
      Swal.fire({
        icon: "success",
        title: "Logout Successful!",
        showConfirmButton: false,
        timer: 3000,
      });
    });
}
