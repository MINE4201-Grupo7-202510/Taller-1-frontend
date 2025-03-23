import React from 'react';

function UserProfile({ user }) {
  return (
    <div className="card">
      <div className="card-header">Datos del Usuario Activo</div>
      <div className="card-body">
        <h5 className="card-title">{user.name}</h5>
        <p className="card-text">ID: {user.id}</p>
      </div>
    </div>
  );
}

export default UserProfile;