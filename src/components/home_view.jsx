import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home_view.css";

const HomeView = ({ characters }) => {
  const renderCharacterGrid = () => {
    return (
      (characters.length === 0 && <div>Characters loading...</div>) || (
        <div className="character-grid-inner">
          {characters.map((character) => (
            <Link
              className="panel character-card"
              to={"/" + character.name}
              key={character.name}
            >
              <div
                className="character-card__character-image"
                style={{ backgroundImage: `url(${character.imageSrc})` }}
              ></div>
              <h2 className="character-card__character-name">
                {character.name}
              </h2>
            </Link>
          ))}
        </div>
      )
    );
  };

  const handleLogoMouseEnter = () => {
    const logoSquare = document.getElementsByClassName(
      "Rollr-logo__rectangle-shape"
    )[0];
    logoSquare.classList.add("Rollr-logo__rectangle-shape_animated");
    setTimeout(() => {
      logoSquare.classList.remove("Rollr-logo__rectangle-shape_animated");
      // logoSquare.className = "Rollr-logo__rectangle-shape";
    }, 1000);
  };

  return (
    <div className="view">
      <h2
        className="welcome-text text__centered"
        onMouseEnter={handleLogoMouseEnter}
      >
        Welcome to{" "}
        <span className="Rollr-logo">
          Rollr
          <div className="Rollr-logo__rectangle-shape" />
        </span>
      </h2>
      <h1 className="text__centered">Who's Playing?</h1>
      <div className="character-grid">{renderCharacterGrid()}</div>
      <div className="footer">Made by ✋🏻 Made with ❤️</div>
    </div>
  );
};

export default HomeView;
