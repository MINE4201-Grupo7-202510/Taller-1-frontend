import React from 'react';

function NavBar({ activeUser, onLogout }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">MINE4201 - Modelos Colaborativos</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {activeUser ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Bienvenido, {activeUser.name}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-sm btn-outline-light" onClick={onLogout}>Logout</button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <span className="nav-link">Inicie sesión</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;