const popupElement = document.querySelector(".popup_wrapper");
const landingWrapper = document.querySelector(".landing_wrapper");
const cross = document.querySelector(".cross");
console.log(popupElement.classList);

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

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("signup_button")) {
    showPopup();
  }
  if (event.target.classList.contains("cross")) {
    closePopup();
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key === "Escape" && !isPopupClosed()) {
    closePopup();
  }
});
