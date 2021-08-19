import React, { useMemo } from "react";
import { Redirect, useParams } from "react-router-dom";
import { getHeroesById } from "../../selectors/getHeroesById";

import batman from "../../assets/heroes/dc-batman.jpg";
const heroImages = require.context("../../assets/heroes", true); //true to search in subfolders

export const HeroScreen = ({ history }) => {
  const { heroeId } = useParams();
  //This function will trigger if the heroeId changes
  const hero = useMemo(() => getHeroesById(heroeId), [heroeId]);

  // const hero = getHeroesById(heroeId);

  if (!hero) {
    return <Redirect to="/" />;
  }
  const handleReturn = () => {
    //This is if the first page if a hero and the previous page is the home screen of the browser
    if (history.length <= 2) history.push("/");
    else history.goBack();
  };

  const { superhero, publisher, alter_ego, first_appearance, characters } =
    hero;

  return (
    <div className="row mt-5">
      <div className="col-4">
        <img
          // src={`../assets/heroes/${heroeId}.jpg`} //from assets
          // src={batman} //from import
          src={heroImages(`./${heroeId}.jpg`).default}
          className="img-thumbnail animate__animated animate__fadeInLeft"
          alt={superhero}
        />
      </div>
      <div className="col-8">
        <h3>{superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter ego: </b>
            {alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher: </b>
            {publisher}
          </li>
          <li className="list-group-item">
            <b>First appearance: </b>
            {first_appearance}
          </li>
        </ul>
        <h5 className="mt-2">Characters</h5>
        <p>{characters}</p>
        <button className="btn btn-outline-primary" onClick={handleReturn}>
          Return
        </button>
      </div>
    </div>
  );
};
