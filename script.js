const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const toggle = document.getElementById("toggle");
const formTitle = document.getElementById("form-title");
const toggleText = document.getElementById("toggle-text");

let isSignup = true;

// Toggle Login/Signup
toggle.addEventListener("click", () => {
  isSignup = !isSignup;

  if (isSignup) {
    formTitle.innerText = "Signup";
    confirmPassword.style.display = "block";
    toggleText.innerHTML = `Already have an account? <span id="toggle">Login</span>`;
  } else {
    formTitle.innerText = "Login";
    confirmPassword.style.display = "none";
    toggleText.innerHTML = `Don't have an account? <span id="toggle">Signup</span>`;
  }

  location.reload();
});

// Show Error
function showError(input, message) {
  const error = input.nextElementSibling;
  input.classList.add("error-border");
  error.innerText = message;
}

// Show Success
function showSuccess(input) {
  const error = input.nextElementSibling;
  input.classList.remove("error-border");
  error.innerText = "";
}

// Email Validation
function isValidEmail(emailVal) {
  return /^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(emailVal);
}

// Password Validation
function isStrongPassword(pass) {
  return /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(pass);
}

// Real-time validation
[username, email, password, confirmPassword].forEach(input => {
  input.addEventListener("input", () => validateField(input));
});

function validateField(input) {
  const value = input.value.trim();

  if (value === "") {
    showError(input, "Field cannot be empty");
    return;
  }

  if (input === email && !isValidEmail(value)) {
    showError(input, "Invalid email format");
    return;
  }

  if (input === password && !isStrongPassword(value)) {
    showError(input, "Password must contain 1 uppercase, 1 number, min 6 chars");
    return;
  }

  if (input === confirmPassword && isSignup) {
    if (value !== password.value) {
      showError(input, "Passwords do not match");
      return;
    }
  }

  showSuccess(input);
}

// Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateField(username);
  validateField(email);
  validateField(password);

  if (isSignup) {
    validateField(confirmPassword);
  }

  if (document.querySelectorAll(".error-border").length === 0) {
    alert(isSignup ? "Signup Successful!" : "Login Successful!");
  }
});