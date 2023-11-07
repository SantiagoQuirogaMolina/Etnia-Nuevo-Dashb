/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from 'react-router-dom';

import styles from './NavBar.module.css';
import Home from '../../assets/png/Home.png';
import Carrito from '../../assets/png/Carrito.png';
import Usuario from '../../assets/png/Usuario.png';
import Configuraciones from '../../assets/png/Configuraciones.png';
import web_analysis_icon from '../../assets/png/web_analysis_icon.png';


function NavBar(props) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();

  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate(`/user`); // User is logged in, redirect to user details page.
    } else {
      navigate('/user'); // User is not logged in, redirect to login page.
    }
  };


  return (
    <div className={styles.navbar}>
      <button onClick={handleUserClick}>
        <img className={styles.Usuario} src={Usuario} alt="Usuario" />
      </button>

      <button>
        <Link to="/"><img className={styles.Home} src={Home} alt="Home" /></Link>
      </button>

      <button>
        <Link to="/carrito"><img className={styles.Carrito} src={Carrito} alt="Carrito" /></Link>
      </button>

      <button>
        <Link to="/home"><img className={styles.Configuraciones} src={Configuraciones} alt="Configuraciones" /></Link>
      </button>
      
      <button>
        <Link to="/admin"><img  src={web_analysis_icon} alt="web_analysis_icon" /></Link>
      </button>

      <button>
        <Link to="/favorites"><img src="https://www.emojiall.com/images/240/classic/1f5a4.png" /></Link>
      </button>
    </div>
  );
}

export default NavBar;
