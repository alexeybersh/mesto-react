import Card from '../Card/Card'

export default function Main(props) {
  return (
    <>
      <main className="main-page">
          <section className="profile">
            <div className="profile__intro">
              <button type="button" className="profile__avatar-button" onClick={props.onEditAvatar}>
                <img className="profile__avatar" src={props.userAvatar} alt="Аватар профиля"/>
              </button>
              <div className="profile__profile-info">
                <div className="profile__first-row">
                  <h1 className="profile__title">{props.userName}</h1>
                  <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
                </div>
                <p className="profile__subtitle">{props.userDescription}</p>
              </div>
            </div>
            <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
          </section>
          <section className="elements">
            <ul className="elements__list">
              {props.cards.map((card) =>(
                <Card
                  card={card}
                  key= {card._id} 
                  onCardClick={props.onCardClick}
                  cardLink={card.link}
                  cardName={card.name}
                  >
                </Card>
              ))}
            </ul>
          </section>
        </main>
    </>
  )
}
