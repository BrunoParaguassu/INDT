import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import AdminUsersPage from './components/AdminUsersPage';
import ProfilePage from './components/ProfilePage';

function App() {
  return (
    <Router>
      <div className="page-bg-blue"> {/* Adiciona uma cor de fundo azul à página */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/home">Home</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/home" element={<Home />} /> {/* Rota para tela home*/}
          <Route path="/login" element={<Login />} /> {/* Rota para a tela de login */}
          <Route path="/register" element={<Register />} /> {/* Rota para a tela de registro */}
          <Route path="/admin" element={<AdminUsersPage />} /> {/* Rota para tela de admin */}
          <Route path="/profile/:id" element={<ProfilePage />} /> {/* Rota para tela de usuario */}
          {/* Adicione outras rotas conforme necessário */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
