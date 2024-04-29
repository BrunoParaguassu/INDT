import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        senha: '',
        nivel_acesso: 'admin' // Valor padrão para o campo de seleção
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
            const response = await axios.post('http://localhost:5000/register', formData);
            console.log('Novo usuário registrado:', response.data);
            setError('');
            window.location.href = '/login';
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
                                        type="password"
                                        className="form-control"
                                        id="senha"
                                        name="senha"
                                        value={formData.senha}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                {/* Campo select para o nível de acesso */}
                                <div className="mb-3">
                                    <label htmlFor="nivel_acesso" className="form-label">Nível de Acesso:</label>
                                    <select
                                        className="form-select"
                                        id="nivel_acesso"
                                        name="nivel_acesso"
                                        value={formData.nivel_acesso}
                                        onChange={handleInputChange}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="comum">Comum</option>
                                    </select>
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
