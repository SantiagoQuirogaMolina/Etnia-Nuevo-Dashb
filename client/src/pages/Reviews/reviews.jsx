import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './reviews.module.css';
import { createReview, deleteReview, getReviewById } from '../../redux/actions';

// Componente para una estrella individual
// eslint-disable-next-line react/prop-types
const Star = ({ selected, onSelect }) => (
  <button
    type="button"
    onClick={onSelect}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onSelect();
      }
    }}
  >
    {selected ? '⭐' : '✩'}
  </button>
);



// eslint-disable-next-line react/no-typos
Star.PropTypes = {
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

// eslint-disable-next-line react/prop-types
const Reviews = ({productId}) => {
  const dispatch = useDispatch();
  const reviewId = useSelector((state) => state.reviewId);
  // const reviewsById = useSelector((state) => state.reviews);
  const [newReview, setNewReview] = useState({
    calification: 1,
    review: '',
  });
console.log(productId);
  useEffect(() => {
    dispatch(getReviewById(productId));
  }, [productId , dispatch]);
  console.log("aqui toy resenando");
  console.log(reviewId);

  const handleCreateReview = () => {
    dispatch(createReview(newReview));
    setNewReview({
      calification: 1,
      review: '',
    });
  };
  
  const handleDeleteReview = (id) => {
    dispatch(deleteReview(id));
  };

  const handleStarClick = (selectedStar) => {
    setNewReview({ ...newReview, calification: selectedStar });
  };

  return (
    <div className={styles.container}>
      <p>Reseñas del producto</p>
      <ul>
        {reviewId?.map((review) => (
          <li key={review.id}>
            Calificación: {review.calification}, Revisión: {review.review}{' '}
            <button type="button" onClick={() => handleDeleteReview(review.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <p>Crear Nueva reseña</p>
      <div className={styles.formContainer}>
        <div className={styles.starContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              selected={star <= newReview.calification}
              onSelect={() => handleStarClick(star)}
            />
          ))}
        </div>
        <label htmlFor="reviewTextArea">
          Reseña:
          <textarea
            value={newReview.review}
            onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
          />
        </label>
        <button type="button" onClick={handleCreateReview}>
          Crear Revisión
        </button>
      </div>
    </div>
  );
};

export default Reviews;
