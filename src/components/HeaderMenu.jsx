import React from "react";
import { NavLink } from "react-router-dom";

import SocialMedIconGroup from "./SocialMedIconGroup";

function HeaderMenu() {
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container p-3">
        <a className="navbar-brand" href="https://technisupport.co/">
          <img
            className="header_logo"
            src="https://technisupport.co/wp-content/uploads/2019/03/LogoTS222.png"
            alt="TechniSupport"
          ></img>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#header-nav-menu"
          aria-controls="header-nav-menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="header-nav-menu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 icon-link">
            <li className="nav-item">
              <a className="nav-link active" href="https://technisupport.co/">
                INICIO
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                href="https://technisupport.co/servicios/"
              >
                SERVICIOS
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link active"
                href="https://technisupport.co/contacto/"
              >
                CONTACTO
              </a>
            </li>
            <li className="nav-item">
              <NavLink to={"/"} className="nav-link active">
                <strong>ADDRESS-BOOK</strong>
              </NavLink>
            </li>
          </ul>
          <SocialMedIconGroup></SocialMedIconGroup>
        </div>
      </div>
    </nav>
  );
}

export default HeaderMenu