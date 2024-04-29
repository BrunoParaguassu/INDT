import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        senha: '',
        nivel_acesso: 'admin'
    });
    const [error, setError] = useState('');

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
            // Faz a requisição para registrar um novo usuário
            const response = await axios.post('http://localhost:5000/register', formData);
            console.log('Novo usuário registrado:', response.data);
            setError('');
            // Redirecionar o usuário para a página de login após o registro bem-sucedido
            // Aqui você pode definir a lógica de redirecionamento para a página desejada após o registro
            window.location.href = '/login'; // Redireciona para a página de login
        } catch (error) {
            console.error('Erro ao registrar novo usuário:', error);
            setError('Erro ao registrar novo usuário.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Registro</h3>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="nome" className="form-label">Nome:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nome"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="sobrenome" className="form-label">Sobrenome:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="sobrenome"
                                        name="sobrenome"
                                        value={formData.sobrenome}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
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
                                    <button type="submit" className="btn btn-primary">Registrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
