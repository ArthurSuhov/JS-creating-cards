const popUpOpenButton = document.querySelector(".user-info__button");
const popUpOpenEditButton = document.querySelector(".user-info__edit");
const popUpCloseButton = document.querySelector(".popup__close");
const popUpCloseEditButton = document.querySelector(".popup__close-edit");
const popUpCloseImgButton = document.querySelector(".popup__close-img");
const popUpImg = document.querySelector(".popup_img");
const popUpForm = document.forms.new;
const popUpFormEdit = document.forms.formEdit;
const placesList = document.querySelector(".places-list");
const templateCard = document.querySelector("#template-card").content.querySelector(".place-card");
const userInfoData = document.querySelector(".user-info__data");
const popUpWindow = document.querySelector(".popup");
const popUpEditWindow = document.querySelector(".popup_edit");
const popUpImgWindow = document.querySelector(".popup_img");
const newCardAddButton = document.querySelector("#addCard");
const editCardProfileSave = document.querySelector("#save");
const name = popUpForm.elements.name;
const link = popUpForm.elements.link;
const nameEdit = popUpFormEdit.elements.nameEdit;
const aboutEdit = popUpFormEdit.elements.aboutEdit;
const userName =  document.querySelector(".user-info__name");
const userAbout = document.querySelector(".user-info__job");

function addCard(place, name, link) {
  const newCard = templateCard.cloneNode(true);
  newCard.querySelector(".place-card__name").textContent = name;
  newCard.querySelector(".place-card__image").style.backgroundImage = `url(${link})`;
  place.appendChild(newCard);
}

// Редактирование информации
function editCardProfile(event) {
  event.preventDefault();

  userName.textContent = nameEdit.value;
  userAbout.textContent = aboutEdit.value;
  formEdit.reset();
}
editCardProfileSave.addEventListener('click', function(event){
  editCardProfile(event)
  togglePopUp(popUpEditWindow);
});


function addNewCard(event) {
  addCard(placesList, name.value, link.value);
  event.preventDefault();
  popUpWindow.classList.remove("popup_is-opened");
  popUpForm.reset();

  newCardAddButton.setAttribute("disabled", 'true');
  newCardAddButton.classList.remove('popup__button_is-active');
  
}


function addCardList(array) {
  for (let i = 0; i < array.length; i++) {
    addCard(placesList, array[i].name, array[i].link);
  }
}
addCardList(initialCards);

function deleteCard(event){
  const current = event.target.closest(".place-card");
  placesList.removeChild(current);
}




function togglePopUp(popUpWindow){
  popUpWindow.classList.toggle('popup_is-opened');
}


function toggleLikeIcon(event){
  event.target.classList.toggle("place-card__like-icon_liked");
}


popUpOpenEditButton.addEventListener("click", function(event){

  nameEdit.value = userName.textContent;
  aboutEdit.value = userAbout.textContent;
  togglePopUp(popUpEditWindow);
});
popUpCloseEditButton.addEventListener("click", function(event){
  togglePopUp(popUpEditWindow);
});


popUpOpenButton.addEventListener("click", function (event) { 
  togglePopUp(popUpWindow)
});
popUpCloseButton.addEventListener("click", function (event) { 
   togglePopUp(popUpWindow)
});

popUpCloseImgButton.addEventListener("click", function (event){
  togglePopUp(popUpImgWindow);
});


placesList.addEventListener("click", function (event) {
  if (event.target.classList.contains("place-card__like-icon")) {
    toggleLikeIcon(event)
  } else  if (event.target.classList.contains("place-card__delete-icon")) {
    deleteCard(event)
  }

});


popUpForm.addEventListener("submit", addNewCard);



// Попап с фотографией
placesList.addEventListener('click', function (event) {
  event.preventDefault();
  if (event.target.classList.contains('place-card__image')) {
      let popUpImg = document.querySelector('.popup__picture');
      let link = (event.target.style.backgroundImage.split('')).slice(5, -2).join('');
      popUpImg.setAttribute('src', link);
      togglePopUp(popUpImgWindow);
  }
});




const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongUrl: 'Здесь должна быть ссылка',
}


function isValidate(input) {
  input.setCustomValidity(""); 

  if (input.validity.valueMissing) {
    input.setCustomValidity(errorMessages.empty);
    return false
  }  

  if (input.validity.tooShort || input.validity.tooLong) {
    input.setCustomValidity(errorMessages.wrongLength);
    return false
  } 

  if (input.validity.typeMismatch && input.type === 'url') {
    input.setCustomValidity(errorMessages.wrongUrl);
    return false
  } 

  if (input.validity.rangeOverflow) {
    let max = input.getAttribute('max');
    input.setCustomValidity(`Максимальное значение ${max}`);
    return false
  }
  return input.checkValidity();
}

// добавляем и удаляем сообщения об ошибке
function isFieldValid(input) { 
  const errorElem = input.parentNode.querySelector(`#${input.id}-error`);
  const valid = isValidate(input); 
  errorElem.textContent = input.validationMessage;
  return valid;
}

// проверка формы на валидность
function isFormValid(form) { 
  const inputs = form.querySelectorAll('input');
  let valid = true; 
  inputs.forEach((input) => {
    if (input.type !== 'submit' && input.type !== 'button') {
      if (!isFieldValid(input)) valid = false;
    }
  }); 
  return valid;
}
// состояние кнопки
function setSubmitButtonState (button, state){
  if(state){
    button.removeAttribute('disabled');
    button.classList.add('popup__button_is-active');
    button.classList.remove('popup__button_is-disabled');
  }else{
    button.setAttribute('disabled', true);
    button.classList.remove('popup__button_is-active');
    button.classList.add('popup__button_is-disabled');
  }
}

function handlerInputForm(event){
  const submit = event.currentTarget.querySelector('.button');
  const [...inputs] = event.currentTarget.elements;
  
  isFieldValid(event.target); 
  
  if (inputs.every(isValidate)) { 
    setSubmitButtonState(submit, true);
  } else {
    setSubmitButtonState(submit, false);
  }
}

function sendForm(event) {
  event.preventDefault();
  const currentForm = event.target;
  const isValid = isFormValid(currentForm);

  if (isValid) {
    event.target.reset();
  } else {
  }
}

popUpForm.addEventListener('submit', sendForm);
popUpForm.addEventListener('input', handlerInputForm, true);


popUpFormEdit.addEventListener('submit', sendForm);
popUpFormEdit.addEventListener('input', handlerInputForm, true);
