document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault(); // Prevent form submission
  const username = document.getElementById("input_name").value;
  const password = document.getElementById("input_password").value;
  await login(username, password);
});

async function login(username, password) {
  try {
    const roleResponse = await fetch("http://localhost:3000/role", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const roleData = await roleResponse.json();

    const adminResponse = await fetch("http://localhost:3000/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const adminData = await adminResponse.json();

    const customerResponse = await fetch("http://localhost:3000/customer", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const customerData = await customerResponse.json();
    const roleIds = roleData.map((role) => role.id);
    const admin = adminData.find((admin) => admin.name === username);
    const customer = customerData.find((customer) => customer.name === username);

    if (admin && admin.password === password && roleIds.includes(admin.roleId)) {
      console.log("Admin login successful");
      const id = admin.roleId;
      const admin_id = admin.id;
      const link = `/page/home/home.html?roleId=${admin_id}`;
      localStorage.setItem("roleId", id);
      localStorage.setItem("userId", admin_id);
      window.location.href = link;
      Swal.fire({
        icon: "success",
        title: "Admin login successful!",
        showConfirmButton: false,
        timer: 1500
      });
    } else if (customer && customer.password === password && roleIds.includes(customer.roleId)) {
      console.log("Customer login successful");
      const cus_id = customer.id;
      const id = customer.roleId;
      const link = `/page/home/home.html?roleId=${cus_id}`;
      localStorage.setItem("roleId", id);
      localStorage.setItem("userId", cus_id);
      window.location.href = link;
      Swal.fire({
        icon: "success",
        title: "Customer login successful!",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      console.log("Invalid username, password, or role");
      alert("Name and password wrong!");
    }
  } catch (error) {
    console.log(error);
  }
}