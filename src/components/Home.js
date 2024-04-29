import React from 'react';
import { Link } from 'react-router-dom';


function Home() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Gerenciamento de Usuários</h2>
              <div className="d-grid gap-2">
                <Link to="/login" className="btn btn-primary btn-lg">Login</Link>
                <Link to="/register" className="btn btn-secondary btn-lg">Registrar</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
