import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  // Utilisation d'un hook personnalisé appelé useData pour récupérer des données. La destructuration est utilisée pour extraire la propriété data retournée par ce hook.
  const { data } = useData();
  //Utilisation du hook d'état (useState) pour gérer l'état local du composant. 
  //index représente l'indice de la carte actuellement affichée, et setIndex est la fonction pour mettre à jour cet état.
  const [index, setIndex] = useState(0);


//Tri des données récupérées par date, du plus récent au plus ancien. Le tri est effectué sur le tableau focus des données.
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  //Définition de la fonction nextCard qui utilise setTimeout pour changer l'indice de la carte actuellement affichée toutes les 5000 millisecondes (5 secondes).
  // Si l'indice atteint la fin du tableau, il revient à zéro.
  const nextCard = () => {
    // Ajout de la vérification si "byDateDesc" existé et a une valeur
    // et si la lenght de "byDateDesc" est supérieure à 0
    // Si oui on exécute setTimeout
    if (byDateDesc && byDateDesc.length > 0) {
      setTimeout(
        // Ajout du -1 pour vérifier si la prochaine carte à afficher est la dernière carte du slider
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
        5000
      );
    }
  };

  useEffect(() => {
    nextCard();
  });

  //Le rendu du composant comprend une liste de cartes (SlideCard) et une pagination sous forme de boutons radio. 
  //La classe display ou hide est appliquée à chaque carte en fonction de l'indice actuel. La clé des éléments est définie comme le titre de l'événement, 
  //et chaque bouton radio a une clé unique construite à partir du titre de l'élément dotItem.

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Changement de place de la key
        <div key={event.title}>
          <div
            // Ancien emplacement de la key
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {/* Changement de _ par dotItem (bouton) */}
              {byDateDesc.map((dotItem, radioIdx) => (
                <input
                  // Changement de la key anciennement key={`${event.id}`}
                  // clé construite en utilisant le titre de l'élément dotItem
                  // et en  en ajoutant le texte "radio-" ce qui la rend unique.
                  key={`radio-${dotItem.title}`}
                  type="radio"
                  name="radio-button"
                  // Modification d'idx (= indice de l'élément dans le tableau byDataDesc) en index (= indice de la carte du slider affiché)
                  checked={index === radioIdx}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
