import React, { useState, useEffect } from 'react';
import UserProfile from './UserProfile';
import RatingHistory from './RatingHistory';
import Recommendations from './Recommendations';
import MovieSearch from './MovieSearch';

function Dashboard({ user, data, onAddRating, onRetrainModel, loading }) {
  const [movies, setMovies] = useState([]);
  const [showMovieSearch, setShowMovieSearch] = useState(false);
  const [retrainMessage, setRetrainMessage] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/movies/')
      .then(response => response.json())
      .then(data => {
        setMovies(data);
      })
      .catch(error => console.error('Error al cargar películas:', error));
  }, []);

  const handleAddRating = (movieId, rating) => {
    onAddRating(user.id, movieId, rating);
    setShowMovieSearch(false);

    // Si las recomendaciones no son personalizadas, mostrar mensaje sugiriendo reentrenar
    if (!data.personalized) {
      setRetrainMessage({
        type: 'info',
        text: 'Has añadido un rating. Reentrenar el modelo para obtener recomendaciones personalizadas.'
      });
      
      setTimeout(() => setRetrainMessage(null), 8000);
    }
  };

  const handleRetrainModel = () => {
    setRetrainMessage(null);
    onRetrainModel();
  };

  return (
    <div>
      <h2 className="mb-4">Panel de Recomendaciones - Modelo Ítem-Ítem</h2>
      <UserProfile user={user} />
      
      <div className="mb-3 mt-3 d-flex justify-content-between">
        <button 
          className="btn btn-primary" 
          onClick={() => setShowMovieSearch(!showMovieSearch)}
        >
          {showMovieSearch ? 'Ocultar búsqueda' : 'Calificar una película'}
        </button>
        
        <button 
          className="btn btn-success" 
          onClick={handleRetrainModel}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Reentrenando...
            </>
          ) : 'Reentrenar Modelo'}
        </button>
      </div>
      
      {retrainMessage && (
        <div className={`alert alert-${retrainMessage.type} alert-dismissible fade show`}>
          {retrainMessage.text}
          <button type="button" className="btn-close" onClick={() => setRetrainMessage(null)}></button>
        </div>
      )}
      
      {showMovieSearch && (
        <MovieSearch movies={movies} onRateMovie={handleAddRating} />
      )}
      
      <div className="row">
        <div className="col-md-6">
          <RatingHistory ratings={data.ratingsHistory} />
        </div>
        <div className="col-md-6">
          <Recommendations 
            recommendations={data.recommendations} 
            personalized={data.personalized}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;