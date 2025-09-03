const popupElement = document.querySelector(".popup_wrapper");
const landingWrapper = document.querySelector(".landing_wrapper");
const cross = document.querySelector(".cross");
const email = document.querySelector(".form_email");
const password = document.querySelector(".form_password");
const emailMessage = document.querySelector(".email_message");
const passwordMessage = document.querySelector(".password_message");
const emailErrIcon = document.querySelector(".email_error-icon");
const passwordErrIcon = document.querySelector(".password_error-icon");

const url = "https://api.dating.com/identity";

const showPopup = () => {
  landingWrapper.classList.add("blurred");
  popupElement.classList.remove("hidden");
};

const closePopup = () => {
  landingWrapper.classList.remove("blurred");
  popupElement.classList.add("hidden");
};

const isPopupClosed = () => {
  return popupElement.classList.contains("hidden");
};

const setInputError = (field) => {
  if (field === "email") {
    email.classList.add("form_email-error");
    emailErrIcon.classList.remove("hidden");
    emailMessage.classList.remove("hidden");
  }
  if (field === "password") {
    password.classList.add("form_password-error");
    passwordErrIcon.classList.remove("hidden");
    passwordMessage.classList.remove("hidden");
  }
};

const areFormsValid = () => {
  if (email.validity.valid && password.value.length >= 8) {
    return true;
  }
};

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("signup_button")) {
    showPopup();
  }
  if (event.target.classList.contains("cross")) {
    closePopup();
  }

  if (event.target.classList.contains("form_submit")) {
    if (!email.validity.valid) {
      setInputError("email");
    }
    if (password.value.length < 8 && password.value.length !== 0) {
      setInputError("password");
    }
    if (areFormsValid()) {
      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "Escape" && !isPopupClosed()) {
    closePopup();
  }
});
