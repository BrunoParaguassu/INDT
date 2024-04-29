// AdminUsersPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa o useNavigate do react-router-dom

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Inicializa o useNavigate

  useEffect(() => {
    // Função para carregar os usuários ao montar o componente
    const fetchUsers = async () => {
      try {
        // Faz a requisição para obter a lista de usuários
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data); // Atualiza o estado com os usuários recebidos
      } catch (error) {
        console.error('Erro ao obter usuários:', error);
      }
    };

    fetchUsers(); // Chama a função para carregar os usuários
  }, []);

  const handleUpdateUser = async (userId) => {
    try {
      // Faz a requisição para atualizar o usuário com o ID fornecido
      const response = await axios.put(`http://localhost:5000/users/${userId}`, { /* Dados do usuário para atualizar */ });
      console.log('Usuário atualizado com sucesso:', response.data);

      // Redireciona para a página de perfil com os dados do usuário
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Faz a requisição para excluir o usuário com o ID fornecido
      await axios.delete(`http://localhost:5000/users/${userId}`);
      console.log('Usuário excluído com sucesso:', userId);
      // Remove o usuário da lista após a exclusão
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Administração de Usuários</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">E-mail</th>
            <th scope="col">Nível de Acesso</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.nivel_acesso}</td>
              <td>
                <button className="btn btn-primary me-2" onClick={() => handleUpdateUser(user.id)}>Atualizar</button>
                <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;
