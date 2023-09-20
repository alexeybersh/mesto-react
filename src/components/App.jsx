import { useEffect, useState } from 'react'
import Header from './header/Header'
import Main from './main/Main'
import Footer from './footer/Footer'
import PopupWithForm from './PopupWithForm/PopupWithForm'
import ImagePopup from './ImagePopup/ImagePopup'
import { api } from '../utils/Api'

function App() {
  // const [count, setCount] = useState(0)

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(0)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(0)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(0)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(0)
  const [userInfo, setUserInfo] = useState({})
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState({})

  // Ручка для открытия попапа аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(1)
  }
  
  // Ручка для открытия попапа редактирование профиля
  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(1)
  }

  // Ручка для открытия попапа добавление картинки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(1)
  }

  // Ручка для открытия попапа большой картинки
  function handleCardClick (card) {
    setIsImagePopupOpen(1)
    setSelectedCard({name: card.name, link: card.link})
  }

  // Ручка закрытия всех попапов
  function closeAllPopups(){
    setIsEditAvatarPopupOpen(0)
    setIsEditProfilePopupOpen(0)
    setIsAddPlacePopupOpen(0)
    setIsImagePopupOpen(0)
  }

  // Эффект для получения по апи информации о юзере и массив картинок
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getAllCards()])
    .then(([userData, allCards]) => {
       setUserInfo(userData);
       setCards(allCards);
    })
  }, [])

  // Эффект для закрытия попапа по ESC
  useEffect(() => {
    document.addEventListener('keydown', (evt) => {
      if(evt.key == 'Escape') {
        closeAllPopups()
      }
    })
  }, [])

  // Эффект для закрытия попапа по overlay
  useEffect(() => {
    document.addEventListener('mousedown', (evt) => {
      if(evt.target.classList.contains('popup_opened') !==  evt.target.classList.contains('popup__close-button')) {
        closeAllPopups()
      };
  })}, []);   

  return (
    <>
      <Header/>
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick} 
        userName={userInfo.name}
        userDescription={userInfo.about}
        userAvatar={userInfo.avatar}
        cards={ cards }
      />      
      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        submitText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
        <label className="popup__field">
          <input
            className="popup__input popup__input_input-name_text"
            id="name-input"
            name="name"
            type="text"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
            value=""
          />
          <span className="popup__input-error name-input-error" ></span>
        </label>
        <label className="popup__field">
          <input
            className="popup__input popup__input_input-job_text"
            id="job-input"
            name="job"
            type="text"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
            value=""
          />
          <span className="popup__input-error job-input-error" ></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name="add-image"
        title="Новое место"
        submitText="Сохранить"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
        <label className="popup__field">
          <input
            className="popup__input popup__input_input-name-image_text"
            id="title-input"
            name="name"
            type="text"
            minLength="2"
            maxLength="30"
            placeholder="Название"
            required
            value=""
          />
          <span className="popup__input-error title-input-error" ></span>
        </label>
        <label className="popup__field">
          <input
            className="popup__input popup__input_link_text"
            id="url-input"
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            required
            value=""
            />
            <span className="popup__input-error url-input-error" ></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        submitText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>        
        <label className="popup__field">
          <input
            className="popup__input popup__input_link_text"
            id="avatar-input"
            name="link"
            type="url"
            placeholder="Ссылка на картинку"
            required
            value=""
            />
            <span className="popup__input-error avatar-input-error" ></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name="delete-image"
        title="Вы уверены?"
        submitText="Да"
        onClose={closeAllPopups}>
        <form name="popup" className="popup__form">
          <button type="submit" className="popup__save-button popup__save-button_delete_image popup__save-button_margin_zero">Да</button>
        </form>
      </PopupWithForm>
      <ImagePopup
        isOpen={isImagePopupOpen}
        card={selectedCard}
        onClose={closeAllPopups}>
      </ImagePopup>
      <Footer/>
    </>
  )
}

export default App
