import React from 'react';

function RatingHistory({ ratings }) {
  return (
    <div className="card">
      <div className="card-header">Historial de Ratings</div>
      <div className="card-body">
        {ratings && ratings.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Movie ID</th>
                  <th>Película</th>
                  <th>Rating</th>
                  <th>Géneros</th>
                </tr>
              </thead>
              <tbody>
                {ratings.map((r) => (
                  <tr key={r.movieId}>
                    <td>{r.movieId}</td>
                    <td>{r.title}</td>
                    <td>{r.rating}</td>
                    <td>{r.genres}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No hay historial de ratings.</p>
        )}
      </div>
    </div>
  );
}

export default RatingHistory;