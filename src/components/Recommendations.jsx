import React from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';

function Recommendations({ recommendations, personalized }) {
  return (
    <div className="card">
      <div className="card-header">
        Recomendaciones para Usted
        {personalized === false && (
          <span className="badge bg-secondary ms-2">No personalizadas</span>
        )}
      </div>
      <div className="card-body">
        {recommendations && recommendations.length > 0 ? (
          <>
            {!personalized && (
              <div className="alert alert-info">
                <small>
                  Estas son recomendaciones generales. {' '}
                  {recommendations.some(rec => rec.non_personalized) ? 
                    'Califica algunas películas y luego usa el botón "Reentrenar Modelo" para obtener recomendaciones personalizadas.' : 
                    'Usa el botón "Reentrenar Modelo" para obtener recomendaciones personalizadas.'}
                </small>
              </div>
            )}
            <ul className="list-group">
              {recommendations.map((rec) => (
                <li className="list-group-item" key={rec.movieId}>
                  <h6>{rec.title}</h6>
                  <p className="mb-1"><strong>Géneros:</strong> {rec.genres}</p>
                  <p className="mb-0">
                    <small className="text-muted">Predicted Rating: {rec.predicted_rating}</small>
                    {rec.non_personalized && <span className="badge bg-light text-secondary ms-2">General</span>}
                  </p>
                  
                  {/* Popover para mostrar la explicación en lugar del panel */}
                  <OverlayTrigger
                    trigger="click"
                    placement="auto"
                    overlay={
                      <Popover id={`popover-${rec.movieId}`}>
                        <Popover.Header as="h3">¿Por qué te recomendamos esta película?</Popover.Header>
                        <Popover.Body>
                          {rec.explanation || (rec.non_personalized 
                            ? "Esta es una recomendación general no personalizada. Califica más películas para obtener recomendaciones personalizadas." 
                            : "Esta recomendación se generó a partir de un análisis colaborativo item-based de su historial de ratings.")}
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <Button variant="link" className="mt-2">Ver explicación</Button>
                  </OverlayTrigger>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>No se han generado recomendaciones.</p>
        )}
      </div>
    </div>
  );
}

export default Recommendations;