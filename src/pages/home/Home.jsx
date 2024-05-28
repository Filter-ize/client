import React from "react";
import "./Home.scss";
import { AiFillCodeSandboxCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import heroImg from "../../assets/hero.jpeg";
import {
  ShowOnLogin,
  ShowOnLogout,
} from "../../components/protect/Hiddelink.jsx";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between">
        <div className="logo">
          <AiFillCodeSandboxCircle size={35} />
        </div>

        <ul className="home-links">
          <ShowOnLogout>
            <li>
              <Link to="/register">Registro</Link>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/login">Logeo</Link>
              </button>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <button className="--btn --btn-primary">
                <Link to="/dashboard">Panel</Link>
              </button>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
      {/* Hero Section */}
      <section className="container hero">
        <div className="hero-text">
            <h2>La Solución a tus Necesidades de Organización</h2>
            <p>
                Organiza tus tareas, proyectos y metas de manera sencilla y
                eficiente.
            </p>
            <div className="hero-buttons">
                <button className="--btn --btn-secondary">
                    <Link to='/dashboard'>Prueba Gratis 1 Mes</Link>
                </button>
            </div>
        </div>
        <div className="--flex-start">
            <NumberText number='' />
        </div>

        <div className="hero-image">
            <img src={heroImg} alt="Hero" />
        </div>
      </section>
    </div>
  );
};

const NumberText = ({ number, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{number}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;
