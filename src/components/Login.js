import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        senha: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use useNavigate para acessar a navegação

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Faz a requisição para fazer login
            const response = await axios.post('http://localhost:5000/login', {
                email: formData.email,
                senha: formData.senha
            });
            // Se o login for bem-sucedido, redireciona para a página inicial
            console.log('Login bem-sucedido:', response.data);
            setError('');
            // Aqui você pode definir a lógica de redirecionamento para a página desejada após o login
            navigate('/admin'); // Use navigate para redirecionar
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Credenciais inválidas. Por favor, verifique seu e-mail e senha.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Login</h3>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">E-mail:</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="senha" className="form-label">Senha:</label>
                                    <input
                                        type="senha"
                                        className="form-control"
                                        id="senha"
                                        name="senha"
                                        value={formData.senha}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
