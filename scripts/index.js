const popupElement = document.querySelector(".popup_wrapper");
const landingWrapper = document.querySelector(".landing_wrapper");
const formWrapper = document.querySelector(".form_wrapper");
const successWrapper = document.querySelector(".success_wrapper");
const cross = document.querySelector(".cross");
const email = document.querySelector(".form_email");
const password = document.querySelector(".form_password");
const emailMessage = document.querySelector(".email_message");
const passwordMessage = document.querySelector(".password_message");
const emailErrIcon = document.querySelector(".email_error-icon");
const passwordErrIcon = document.querySelector(".password_error-icon");

const url = "https://api.dating.com/identity";

const showPopup = async () => {
  landingWrapper.classList.add("blurred");
  popupElement.classList.remove("no-show");
};

const closePopup = () => {
  landingWrapper.classList.remove("blurred");
  popupElement.classList.add("no-show");
  clearSuccessState();
};

const redirectUserToDatingPage = (id) => {
  window.location = `https://www.dating.com/people/#token=${sessionID}`;
};

const isPopupClosed = () => {
  return popupElement.classList.contains("no-show");
};

const setInputError = (field) => {
  if (field === "email") {
    email.classList.add("form_email-error");
    emailErrIcon.classList.remove("no-show");
    emailMessage.classList.remove("no-show");
  }
  if (field === "password") {
    password.classList.add("form_password-error");
    passwordErrIcon.classList.remove("no-show");
    passwordMessage.classList.remove("no-show");
  }
};

const displaySuccessWindow = () => {
  formWrapper.classList.add("hidden");
  successWrapper.classList.remove("hidden");
};

const clearSuccessState = () => {
  successWrapper.classList.add("hidden");
  formWrapper.classList.remove("hidden");
  email.value = "";
  password.value = "";
};

const areFormsValid = () => {
  if (email.validity.valid && password.value.length >= 8) {
    return true;
  }
};

const getSessionID = () => {
  return Object.fromEntries(
    document.cookie.split("; ").map((cookie) => cookie.split("="))
  )["SESSION_ID"];
};

document.addEventListener("click", async (event) => {
  const sessionID = getSessionID();
  if (event.target.classList.contains("signup_button")) {
    if (sessionID) {
      redirectUserToDatingPage(sessionID);
    }
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

        const userID = response.headers.get("X-Token");
        if (userID) {
          document.cookie = `SESSION_ID = ${userID}`;
          displaySuccessWindow();
          setTimeout(() => {
            redirectUserToDatingPage(sessionID);
          }, 5000);
        }
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
