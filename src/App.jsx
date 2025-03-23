import React, { useState } from 'react';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NewUserForm from './components/NewUserForm';

function App() {

  const [activeUser, setActiveUser] = useState(null);
  const [recommendationData, setRecommendationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNewUserForm, setShowNewUserForm] = useState(false);

  const handleLogin = (user) => {
    const userId = user.userId;
    setLoading(true);
    setError(null);
    
    fetch(`http://localhost:8000/recommend/${userId}`)
      .then(response => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Usuario no encontrado. Por favor registre un nuevo usuario o utilice uno existente.");
          }
          throw new Error("Error al obtener recomendaciones");
        }
        return response.json();
      })
      .then(data => {
        const loggedUser = { id: Number(userId), name: `Usuario ${userId}` };
        setActiveUser(loggedUser);
        setRecommendationData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error:", error);
        setError(error.message);
        setLoading(false);
      });
  };

  const handleAddRating = (userId, movieId, rating) => {
    fetch('http://localhost:8000/ratings/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        movie_id: movieId,
        value: rating
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al guardar el rating');
      }
      return response.json();
    })
    .then(() => {
      // Solo actualizamos las recomendaciones si son personalizadas
      // Si son no personalizadas, solo actualizamos el historial
      if (activeUser) {
        return fetch(`http://localhost:8000/users/${userId}/ratings`);
      }
    })
    .then(response => {
      if (response && !response.ok) {
        throw new Error('Error al obtener historial de ratings');
      }
      if (response) return response.json();
    })
    .then(ratingsHistory => {
      if (ratingsHistory) {

        setRecommendationData(prevData => ({
          ...prevData,
          ratingsHistory: ratingsHistory
        }));
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setError(error.message);
    });
  };

  const handleRetrainModel = () => {
    setLoading(true);
    
    fetch('http://localhost:8000/retrain', {
      method: 'POST'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al reentrenar el modelo');
      }
      return response.json();
    })
    .then(() => {
      if (activeUser) {
        return fetch(`http://localhost:8000/recommend/${activeUser.id}`);
      }
    })
    .then(response => {
      if (response && !response.ok) {
        throw new Error('Error al obtener nuevas recomendaciones');
      }
      if (response) return response.json();
    })
    .then(data => {
      if (data) {
        setRecommendationData(data);
        setLoading(false);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setError(error.message);
      setLoading(false);
    });
  };

  const handleCreateUser = () => {
    fetch('http://localhost:8000/users/next-id')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener el próximo ID');
        }
        return response.json();
      })
      .then(data => {
        const nextId = data.next_id;
        return fetch('http://localhost:8000/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: nextId
          }),
        });
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al crear usuario');
        }
        return response.json();
      })
      .then(data => {
        setShowNewUserForm(false);
        alert(`Usuario creado con éxito. Su ID es: ${data.message.split(' ')[1]}`);
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.message);
      });
  };

  const handleLogout = () => {
    setActiveUser(null);
    setRecommendationData(null);
    setError(null);
  };

  return (
    <div>
      <NavBar activeUser={activeUser} onLogout={handleLogout} />
      <div className="container mt-4">
        {!activeUser ? (
          <>
            {showNewUserForm ? (
              <NewUserForm onCreateUser={handleCreateUser} onCancel={() => setShowNewUserForm(false)} />
            ) : (
              <Login 
                onLogin={handleLogin} 
                onNewUser={() => setShowNewUserForm(true)}
                error={error}
                loading={loading}
              />
            )}
          </>
        ) : (
          loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p>Cargando información...</p>
            </div>
          ) : (
            recommendationData ? (
              <Dashboard 
                user={activeUser} 
                data={recommendationData} 
                onAddRating={handleAddRating}
                onRetrainModel={handleRetrainModel}
                loading={loading}
              />
            ) : (
              <div className="alert alert-danger">
                {error || "No hay datos de recomendación disponibles."}
              </div>
            )
          )
        )}
      </div>
    </div>
  );
}

export default App;