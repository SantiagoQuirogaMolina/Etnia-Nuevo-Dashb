/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './NavBar.module.css';
import Home from '../../assets/png/Home.png';
import UserDetail from '../userDetail/UserDetail';
import Carrito from '../../assets/png/Carrito.png';
import Usuario from '../../assets/png/Usuario.png';
import { registroTerceros } from '../../redux/actions';
import { isLoggedIn } from '../../functions/isLoggedIn';
import Configuraciones from '../../assets/png/Configuraciones.png';
import web_analysis_icon from '../../assets/png/web_analysis_icon.png';

function NavBar(props) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth0();
  const isUserLoggedIn = isLoggedIn;
  const tokenTerceros = user?.sub;
  const emailTerceros = user?.email;


  const tokenObject = { sub: tokenTerceros, email: emailTerceros };
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('holaaaa desde la navbar');
    console.log(user);
    console.log(tokenObject);
  

    if (tokenTerceros && tokenTerceros.length > 0 && tokenObject) {
      dispatch(registroTerceros(tokenObject));
    }
  }, [dispatch, isAuthenticated, tokenTerceros, tokenTerceros, user]);

  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate(`/users/${user.sub}`); // User is logged in through Auth0, redirect to Auth0 user details page.
    } else if (isUserLoggedIn) {
      navigate(`/users/:id`); // User is logged in through your own authentication, redirect to your user details page.
    } else {
      navigate('/user'); // User is not logged in, redirect to login page.
    }
  };
  const handleLoginClick = () => {
    navigate('/user');
  };

  return (
    <div className={styles.navbar}>
      {isAuthenticated ? (
        <p>{user.email}</p>
      ) : (
        <button onClick={handleLoginClick}>
          <img className={styles.Usuario} src={Usuario} alt="Usuario" />
        </button>
      )}

      <button>
        <Link to="/">
          <img className={styles.Home} src={Home} alt="Home" />
        </Link>
      </button>

      <button>
        <Link to="/carrito">
          <img className={styles.Carrito} src={Carrito} alt="Carrito" />
        </Link>
      </button>

      <button>
        {isAuthenticated ? (
          <Link to={`/users/${user.sub}`}>
            <img className={styles.Configuraciones} src={Configuraciones} alt="Configuraciones" />
          </Link>
        ) : (
          <UserDetail />
        )}
      </button>

      <button>
        <Link to="/admin">
          <img src={web_analysis_icon} alt="web_analysis_icon" />
        </Link>
      </button>

      <button>
        <Link to="/favorites">
          <img src="https://www.emojiall.com/images/240/classic/1f5a4.png" />
        </Link>
      </button>
    </div>
  );
}

export default NavBar;
