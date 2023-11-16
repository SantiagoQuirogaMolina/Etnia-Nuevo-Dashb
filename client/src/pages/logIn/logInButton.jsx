/* eslint-disable react/button-has-type */
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import styles from "./LogIn.module.css";
import Google from "../../assets/png/Google.png";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <button onClick={() => loginWithRedirect()} className={styles["google-login"]}>
        <img className={styles.googlelogo} src={Google} alt="Google Logo" /> Iniciar con Google
      </button>
    </div>
  );
};

export default LoginButton;