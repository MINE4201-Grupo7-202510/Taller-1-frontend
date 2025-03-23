import React, { useState, useEffect } from 'react';

function Login({ onLogin, onNewUser, error, loading }) {
  const [userId, setUserId] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId.trim() === '') return;
    onLogin({ userId });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">Inicio de Sesión</div>
          <div className="card-body">
            {error && <div className="alert alert-danger">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="userId" className="form-label">ID de Usuario</label>
                <input
                  type="number"
                  className="form-control"
                  id="userId"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Ingrese su ID de Usuario (número)"
                  disabled={loading}
                />
                
              </div>
              
              <div className="d-grid gap-2">
                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="ms-2">Iniciando sesión...</span>
                    </>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={onNewUser}
                  disabled={loading}
                >
                  Crear Nuevo Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;