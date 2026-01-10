import Api from "../utils/Api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a512c660-6992-4f0a-871e-f6c291227bd6",
    "Content-Type": "application/json",
  },
});

import {
  settings,
  enableValidation,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";

import "./index.css";
const profileNameElement = document.querySelector(".profile__name");
const profileDescriptionElement = document.querySelector(
  ".profile__description"
);
const profileAvatar = document.querySelector(".profile__avatar");

const newPostSubmitButton = document.querySelector(
  "#new-post-modal .modal__button"
);

let selectedCard;
let selectedCardId;

// Initial Data Fetching
api
  .getAppInfo()
  .then(([userInfo, cards]) => {
    profileNameElement.textContent = userInfo.name;
    profileDescriptionElement.textContent = userInfo.about;
    profileAvatar.src = userInfo.avatar;

    cards.forEach((cardData) => {
      const cardElement = getCardElement(cardData);
      cardsListElement.append(cardElement);
    });
  })
  .catch(console.error);

// Edit Profile Modal Elements
const editProfileButton = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(
  ".modal__close-button"
);
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

// New Post Modal Elements
const newPostButton = document.querySelector(".profile__add-button");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-button");
const newPostForm = newPostModal.querySelector(".modal__form");
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = avatarModal.querySelector(".modal__form");
const avatarInput = avatarModal.querySelector("#avatar-input");
const avatarCloseBtn = avatarModal.querySelector(".modal__close-button");
const avatarButton = document.querySelector(".profile__avatar-button");
const cardImageInput = newPostModal.querySelector("#card-image-input");
const cardCaptionInput = newPostModal.querySelector("#card-caption-input");
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = deleteModal.querySelector(".modal__form");
const deleteCloseBtn = deleteModal.querySelector(".modal__close-button");
const deleteCancelBtn = deleteModal.querySelector(".modal__button_type_cancel");

// Preview Modal Elements
const previewModal = document.querySelector("#preview-modal");
const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");
const previewCloseBtn = previewModal.querySelector(".modal__close-button");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscapeKey);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscapeKey);
}

// Preview Modal Event Listener
previewCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

// Card Template and Container
const cardTemplate = document.querySelector("#card-template");
const cardsListElement = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content.cloneNode(true).children[0];

  // cloned card elements select
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  // Set card data
  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;

  // like button functionality
  if (data.isLiked) {
    cardLikeButton.classList.add("card__like-button_liked");
  }

  cardLikeButton.addEventListener("click", () => {
    const isLiked = cardLikeButton.classList.contains(
      "card__like-button_liked"
    );

    api
      .changeLikeStatus(data._id, isLiked)
      .then(() => {
        cardLikeButton.classList.toggle("card__like-button_liked");
      })
      .catch(console.error);
  });

  // delete button functionality
  cardDeleteButton.addEventListener("click", () => {
    selectedCard = cardElement;
    selectedCardId = data._id;
    openModal(deleteModal);
  });

  // Add image click for preview modal functionality
  cardImageElement.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}
// Function Definitions
function handleEditProfileSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  submitButton.textContent = "Saving...";

  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })

    .then((data) => {
      profileNameElement.textContent = data.name;
      profileDescriptionElement.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = "Save";
    });
}

function handleNewPostSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  submitButton.textContent = "Saving...";

  api
    .addCard({
      name: cardImageInput.value,
      link: cardCaptionInput.value,
    })
    .then((cardData) => {
      const cardElement = getCardElement(cardData);
      cardsListElement.prepend(cardElement);
      evt.target.reset();
      disableButton(newPostSubmitButton, settings);
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = "Create";
    });
}

// Handle Escape key press
function handleEscapeKey(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

//Handle avatar form submission
function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  submitButton.textContent = "Saving...";

  api
    .editAvatar(avatarInput.value)
    .then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(avatarModal);
      evt.target.reset();
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = "Save";
    });
}

// Delete functionality
function handleDeleteSubmit(evt) {
  evt.preventDefault();

  const submitButton = evt.submitter;
  submitButton.textContent = "Deleting...";

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      submitButton.textContent = "Delete";
    });
}

// Delete Modal Event Listeners
deleteCloseBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteCancelBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteForm.addEventListener("submit", handleDeleteSubmit);

// Edit Profile Modal Event Listeners
editProfileButton.addEventListener("click", () => {
  editProfileNameInput.value = profileNameElement.textContent;
  editProfileDescriptionInput.value = profileDescriptionElement.textContent;

  // Reset validation
  const editForm = editProfileModal.querySelector(".modal__form");
  const inputList = Array.from(
    editForm.querySelectorAll(settings.inputSelector)
  );
  resetValidation(editForm, inputList, settings);

  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

editProfileForm.addEventListener("submit", handleEditProfileSubmit);

// Avatar Modal Event Listeners
avatarButton.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

// New Post Modal Event Listeners
newPostButton.addEventListener("click", function () {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

newPostForm.addEventListener("submit", handleNewPostSubmit);

const modals = document.querySelectorAll(".modal");

modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target === modal) {
      closeModal(modal);
    }
  });
});

enableValidation(settings);
