/* eslint-disable prefer-destructuring */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable perfectionist/sort-named-imports */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/order */
/* eslint-disable perfectionist/sort-imports */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LogoEtniablanco from "../../assets/png/LogoEtniablanco.png";
import styles from "./LogIn.module.css";
import LoginButton from "./logInButton.jsx";
import LogoutButton from "./logOutButton.jsx";
// eslint-disable-next-line import/order
import { useAuth0 } from "@auth0/auth0-react";
import { userLogin, userLogeado, loadCart } from "../../redux/actions";

import { Link, useNavigate } from "react-router-dom";

function LogIn(props) {
  const { isAuthenticated } = useAuth0();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const User = useSelector((state) => state.user);
  const cartLocalStorage = useSelector((state)=> state.cartLocalStorage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Load the Google Sign-In API script
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/platform.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Initialize the Google Sign-In API after the script has finished loading
    const intervalId = setInterval(() => {
      if (window.gapi) {
        clearInterval(intervalId);
        window.gapi.load("auth2", () => {
          window.gapi.auth2.init({
            client_id:
              "404517917936-cigse4isaarorplnlpq4qhrjh99e6vbo.apps.googleusercontent.com",
          });
        });
      }
    }, 100);
  }, []);

  function onSignIn(googleUser) {
    // Get the user's ID token and send it to the server for verification
    const id_token = googleUser.getAuthResponse().id_token;
    // Send the `id_token` to the server using an AJAX request or similar method
  }

  const cargarCarrito = (email)=>{
    console.log("cargarCarrito")
    // eslint-disable-next-line no-shadow, array-callback-return
    cartLocalStorage.forEach(cartPersist => {
      const keys = Object.keys(cartPersist);
    
      keys.forEach(key => {
        console.log("Clave:", key);
        if (key === email) {
          
          console.log(cartPersist[key])
          dispatch(loadCart(cartPersist[key]));
        }
      });
    });
  }

  const handleLogin = (event) => {
    event.preventDefault();

    dispatch(userLogin(email, password))
      .then((response) => {
        dispatch(userLogeado(response));
        // Aquí puedes continuar con el código después de iniciar sesión con éxito
        localStorage.setItem('initialFilters', {});
        cargarCarrito(email);
        navigate("/");
      })
      .catch((error) => {
       
        setError("Correo electrónico o contraseña inválidos");
        // Determina el código de estado según el tipo de error
      });

    console.log(User);
  };

  return (
    <div className={styles["login-container"]}>
      <h2>Welcome to</h2>
      <img src={LogoEtniablanco} alt="Etnia Logo" />

      <form className={styles["login-form"]} onSubmit={handleLogin}>
        <div className={styles["form-group"]}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Log In</button>

        {error && <div className={styles["error-message"]}>{error}</div>}

      </form>
      <nav className={styles.enlacesDiv} >
          <ul className={styles.enlacesUl}>
            <li >
              <p>¿Aún no tienes una cuenta? <Link className={styles.enlaces}  to="/RegisterForm">Registrate</Link></p>
            </li>
            <li>
              <p>¿Olvidaste tu Password? <Link className={styles.enlaces} to="/recuperar-contrasena">Recuperala</Link></p>
            </li>
          </ul>
        </nav>

        {User ? <LogoutButton /> : <LoginButton/>}
      </div>
  );
}
export default LogIn;
