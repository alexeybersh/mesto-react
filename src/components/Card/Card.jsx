export default function Card(props) {

  // Ручка для отображения большой картинки 
  function handleClick() {
    props.onCardClick(props.card);
  } 

  return (
    <>
      <li className="elements__element">
        <img src='../src/images/Trash.svg' alt="Корзина" className="elements__trash" />
        <img className="elements__masc-group" src={props.cardLink} alt={props.cardName} onClick={handleClick}/>
        <div className="elements__description">
          <h2 className="elements__title">{props.cardName}</h2>
          <div className="elements__group-like">
            <button type="button" className="elements__group-button"></button>
            <p className="elements__count-like">{props.card.likes.length? props.card.likes.length: 0}</p>
          </div>
        </div>
      </li>
    </>
  )
}
