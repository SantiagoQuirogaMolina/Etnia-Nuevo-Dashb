/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-imports */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from '../navBar/NavBar';
import styles from '../card/Card.module.css';
import stylesb from './Favorites.module.css';
import { getAllFavs, removeFavoriteBack } from '../../redux/actions';
import stylesContainer from '../cardsContainer/CardsContainer.module.css';

const emptyFavoritesImage = 'https://static.thenounproject.com/png/973577-200.png';

export default function Favorites(props) {
  const favorites = useSelector((state) => state.allFavoritesBack);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps, no-undef
  const loadFavs = () => {
    if (user?.userId) {
      dispatch(getAllFavs(user.userId));
    }
  };

  useEffect(() => {
    loadFavs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFavorite = (id) => {
    dispatch(removeFavoriteBack({ UserId: user.userId, ProductId: id }));
  };

  return (
    <div className={stylesb.container}>
      <NavBar />
      {favorites?.length > 0 ? (
        <>
          <h2>Tus favoritos</h2>
          <div className={stylesContainer['card-container']}>
            {favorites.map((fav) => (
              <div key={fav.id} className={styles.card}>
                <button className={styles.corazon} onClick={() => handleFavorite(fav.id)}>
                  {'❤️'}
                </button>
                <Link to={`/product/${fav.id}`}>
                  <div>
                    <img className={styles.imagen} src={fav.img} alt={fav.name} />
                    <div className={styles.descripcion}>
                      <h2 className={styles.name}>{fav.name}</h2>
                      <h2 className={styles.price}>${fav.price}</h2>
                      {fav.sale > 0 && <h2 className={styles.discount}>{fav.sale}% OFF</h2>}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className={stylesb.emptyFavorites}>
          <img src={emptyFavoritesImage} alt="Empty Favorites" />
          <p>Nada por acá...</p>
        <p>Aún no tenés productos en Favoritos</p>
        </div>
      )}
    </div>
  );
}
