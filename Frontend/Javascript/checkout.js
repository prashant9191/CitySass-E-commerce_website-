let form = document.getElementById("checkout");
let arr = JSON.parse(localStorage.getItem("payment")) || [];
form.addEventListener("submit", function (e) {
  e.preventDefault();
  // console.log("name");
  let userdata = {
    name: form.fsName.value,
    lastName: form.lsName.value,
    email:form.mail.value,
    address: form.add.value,
    city: form.add.value,
    state: form.state.value,
    country: form.country.value,
    zipCode:form.zip.value
    
  };
  arr.push(userdata);
  localStorage.setItem("payment", JSON.stringify(arr));

  form.reset();
  location.href="../Html/payment.html"
});
