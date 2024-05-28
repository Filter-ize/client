import React, { useState } from "react";
import styles from "./auth.module.scss";
import { AiOutlineMail } from "react-icons/ai";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { forgotPassword, validateEmail } from "../../services/authService";
import { toast } from "react-toastify";

const forgot = () => {
  const [email, setEmail] = useState("");

  const forgt = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Por favor ingrese un correo electrónico");
    }

    if (!validateEmail(email)) {
      return toast.error("Por favor ingrese un correo electrónico válido");
    }

    const userData = {
      email,
    };

    await forgotPassword(userData);
    setEmail("");
  };

  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} color="#999" />
          </div>
          <h2>Olvidaste tu Contraseña?</h2>

          <form onSubmit={forgt}>
            <input
              type="email"
              placeholder="Correo Electrónico"
              required
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" className="--btn --btn-primary --btn-block">
              Enviar Correo de Confirmación
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/">- Inicio</Link>
              </p>
              <p>
                <Link to="/login">- Logeo</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default forgot;
