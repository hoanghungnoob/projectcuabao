function logout() {
  Swal.fire({
    icon: "info",
    title: "Confirm Logout",
    text: "Are you sure you want to log out?",
    showCancelButton: true,
    confirmButtonText: "Logout",
    cancelButtonText: "Cancel",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      // Xóa giá trị roleId trong localStorage
      localStorage.removeItem("roleId");
      localStorage.removeItem("userId");
      
      // Chuyển hướng người dùng đến trang logout.html (hoặc trang chủ, tùy thuộc vào yêu cầu của bạn)
      window.location.href = "/page/home/home.html";
      
      document.getElementById('log_out').style.display = "none";
      
      Swal.fire({
        icon: "success",
        title: "Logout Successful!",
        showConfirmButton: false,
        timer: 3000
      });
    }
  });
}