import React, { useState } from "react";
import styles from "./auth.module.scss";
import { BiLogIn } from "react-icons/bi";
import Card from "../../components/card/Card.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { loginUser, validateEmail } from "../../services/authService.jsx";
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice.jsx";
import Loader from "../../components/loader/Loader.jsx";

const initialState = {
  email: "",
  password: "",
};

const login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const hadleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("Todos los campos son requeridos");
    }
    if (!validateEmail(email)) {
      return toast.error("Email no válido");
    }

    const userData = {
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };


  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color="#999" />
          </div>
          <h2>Login</h2>

          <form onSubmit={login}>
            <input
              type="email"
              placeholder="Correo"
              required
              name="email"
              value={email}
              onChange={hadleInputChange}
            />
            <input
              type="password"
              placeholder="Contraseña"
              required
              name="password"
              value={password}
              onChange={hadleInputChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Ingresar
            </button>
          </form>
          <Link to='/forgot'>¿Olvidaste la contraseña?</Link>

          <span className={styles.register}>
          <Link to="/">Inicio</Link>
          <p> &nbsp; ¿No tienes una cuenta aún? &nbsp;</p>
          <Link to="/register">Registrarse</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default login;
