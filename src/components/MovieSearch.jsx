import React, { useState } from 'react';

function MovieSearch({ movies, onRateMovie }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [rating, setRating] = useState(3.0);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    const results = movies.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5); // Limitar a 5 resultados para no sobrecargar la interfaz
    
    setSearchResults(results);
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setSearchResults([]);
  };

  const handleSubmitRating = (e) => {
    e.preventDefault();
    if (selectedMovie) {
      onRateMovie(selectedMovie.id, rating);
      setSelectedMovie(null);
      setSearchTerm('');
      setRating(3.0);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">Calificar una Película</div>
      <div className="card-body">
        {!selectedMovie ? (
          <>
            <form onSubmit={handleSearch}>
              <div className="input-group mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Buscar película..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-outline-secondary" type="submit">Buscar</button>
              </div>
            </form>
            
            {searchResults.length > 0 && (
              <div className="list-group">
                {searchResults.map(movie => (
                  <button 
                    key={movie.id}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleSelectMovie(movie)}
                  >
                    {movie.title}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <form onSubmit={handleSubmitRating}>
            <h5>{selectedMovie.title}</h5>
            <div className="mb-3">
              <label htmlFor="ratingRange" className="form-label">Su Rating: {rating}</label>
              <input 
                type="range" 
                className="form-range" 
                min="0.5" 
                max="5" 
                step="0.5" 
                id="ratingRange"
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
              />
            </div>
            <div className="d-flex justify-content-between">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setSelectedMovie(null)}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">Guardar Rating</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default MovieSearch;