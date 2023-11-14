import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
  getReviewById,
} from '../../redux/actions';

const Reviews= () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews);

  const [newReview, setNewReview] = useState({
    // Define la estructura  aquí
  });

  useEffect(() => {
    dispatch(getAllReviews());
  }, [dispatch]);

  const handleCreateReview = () => {
    dispatch(createReview(newReview));
    // Puedes reiniciar los campos del formulario o realizar otras acciones después de la creación
    setNewReview({
      // Reinicia los campos del formulario.
    });
  };

  const handleUpdateReview = (id) => {
    const updatedReview = {
      
    };
    dispatch(updateReview(updatedReview));
  };

  const handleDeleteReview = (id) => {
    dispatch(deleteReview(id));
  };

  return (
    <div>
      <h1>Lista de Revisiones</h1>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            {review.title}{' '}
            <button onClick={() => handleUpdateReview(review.id)}>Actualizar</button>{' '}
            <button onClick={() => handleDeleteReview(review.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <h2>Crear Nueva Revisión</h2>
      <div>
        {/* ajustar los campos según tu estructura de revisión */}
        <input
          type="text"
          placeholder="Título"
          value={newReview.title}
          onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contenido"
          value={newReview.content}
          onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
        />
        <button onClick={handleCreateReview}>Crear Revisión</button>
      </div>
    </div>
  );
};

export default Reviews;
