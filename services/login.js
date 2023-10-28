document.getElementById("loginForm").addEventListener("submit", async function(event) {
  event.preventDefault(); // Ngăn chặn việc gửi form
  const email = document.getElementById("input_name").value;
  const password = document.getElementById("input_password").value;
  await login(email, password);
});
async function login(email, password) {
  try {
    const [roleResponse, customerResponse] = await Promise.all([
      fetch("http://localhost:3000/role", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      fetch("http://localhost:3000/customer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ]);
    const roleData = await roleResponse.json();
    const customerData = await customerResponse.json();
    const roleIds = roleData.map((role) => role.id);
    const customer = customerData.find((customer) => customer.email === email);

    if (customer && customer.password === password && roleIds.includes(customer.roleId)) {
      const id = customer.roleId;
      const customer_id = customer.id;
      const link = `/page/home/home.html?roleId=${customer_id}`;
      localStorage.setItem("roleId", id);
      localStorage.setItem("userId", customer_id);
      window.location.href = link;
      Swal.fire({
        icon: "success",
        title: "Đăng nhập thành công !",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      alert("Email và mật khẩu không chính xác!");
    }
  } catch (error) {
  }
}