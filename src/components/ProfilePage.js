import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { id } = useParams(); // Captura o ID da URL

    const [userData, setUserData] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        
    });
    const [nome, setnome] = useState('');
    const [sobrenome, setsobrenome] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Carrega os dados do usuário ao montar o componente e sempre que loadUserData mudar
    useEffect(() => {
        const loadUserData = async () => {
            try {
                // Faz a requisição para carregar os dados do usuário com base no ID capturado
                const response = await axios.get(`http://localhost:5000/users/${id}`);
                const { nome, sobrenome, email } = response.data;
                setUserData({ nome, sobrenome, email });
                setError('');
            } catch (error) {
                console.error('Erro ao carregar os dados do usuário:', error);
                setError('Erro ao carregar os dados do usuário.');
            }
        };

        loadUserData();
    }, [id]); // Dependência adicionada para que a função seja chamada sempre que o ID mudar

    const handleChangeName = async () => {
        try {
            // Faz a requisição para atualizar o nome e sobrenome
            await axios.put(`http://localhost:5000/users/${id}`, {
                nome: nome,
                sobrenome: sobrenome
            });
            // Atualiza o estado com os novos dados
            setUserData(prevData => ({
                ...prevData,
                nome: nome,
                sobrenome: sobrenome
            }));
            // Limpa os campos de novo nome e sobrenome
            setnome('');
            setsobrenome('');
            setError('');
            navigate('/admin')
        } catch (error) {
            console.error('Erro ao atualizar o nome e sobrenome:', error);
            setError('Erro ao atualizar o nome e sobrenome.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Perfil do Usuário</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
                <label htmlFor="nome" className="form-label">Nome:</label>
                <input
                    type="text"
                    className="form-control"
                    id="nome"
                    placeholder={userData.nome}
                    onChange={(e) => setnome(e.target.value)}
                    value={nome}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="sobrenome" className="form-label">Sobrenome:</label>
                <input
                    type="text"
                    className="form-control"
                    id="sobrenome"
                    placeholder={userData.sobrenome}
                    onChange={(e) => setsobrenome(e.target.value)}
                    value={sobrenome}
                />
            </div>
            <button className="btn btn-primary mb-3" onClick={handleChangeName}>Atualizar Nome</button>
        </div>
    );
};

export default ProfilePage;
