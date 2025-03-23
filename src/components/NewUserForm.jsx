import React from 'react';

function NewUserForm({ onCreateUser, onCancel }) {
  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">Crear Nuevo Usuario</div>
          <div className="card-body">
            <p>Se creará un nuevo usuario con un ID generado automáticamente.</p>
            <div className="d-grid gap-2">
              <button 
                type="button" 
                className="btn btn-success" 
                onClick={onCreateUser}
              >
                Confirmar Creación
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onCancel}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUserForm;