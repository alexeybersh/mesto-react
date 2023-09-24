import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function DeleteConfirmPopup(props) {

  function handleSubmit(e) {
    e.preventDefault();

    props.onDeleteSubmit(props.cardDelete)
  }

  return (
    <PopupWithForm
      name="delete-image"  
      title="Вы уверены?"
      submitText={props.isRenderLoading? "Удаление..." : "Да"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      >
    </PopupWithForm>
  )
}
