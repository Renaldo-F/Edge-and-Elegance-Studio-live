const form = document.getElementById("bookingForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  // INPUT VALUES of name and such 
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let service = document.getElementById("service").value;
  let date = document.getElementById("date").value;
  let time = document.getElementById("time").value;

  // ERROR ELEMENTS ,  if there us a error it will show this code 
  let nameError = document.getElementById("nameError");
  let emailError = document.getElementById("emailError");
  let phoneError = document.getElementById("phoneError");
  let serviceError = document.getElementById("serviceError");
  let dateError = document.getElementById("dateError");
  let timeError = document.getElementById("timeError");

  // CLEAR ERRORS before the code validates the form, if there is an error it will show the message 
  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
  serviceError.textContent = "";
  dateError.textContent = "";
  timeError.textContent = "";

  // NAME VALIDATION what it is named if it is to be validated 
  if (name === "") {
    nameError.textContent = "Name is required";
    isValid = false;
  }

  // EMAIL VALIDATION wants the email format
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    emailError.textContent = "Enter a valid email";
    isValid = false;
  }

  // PHONE VALIDATION (numbers only, 10+ digits)
  let phonePattern = /^[0-9]{10,}$/;
  if (!phonePattern.test(phone)) {
    phoneError.textContent = "Enter valid phone number";
    isValid = false;
  }

  // SERVICE
  if (service === "") {
    serviceError.textContent = "Select a service";
    isValid = false;
  }

  // DATE
  if (date === "") {
    dateError.textContent = "Select a date";
    isValid = false;
  }

  // basically the TIME
  if (time === "") {
    timeError.textContent = "Select a time";
    isValid = false;
  }

  // IF VALID → SHOW SUCCESS
  if (isValid) {
    document.getElementById("successOverlay").classList.add("show");
    form.reset();
  }
});

// CLOSE OVERLAY
function closeOverlay() {
  document.getElementById("successOverlay").classList.remove("show");
}