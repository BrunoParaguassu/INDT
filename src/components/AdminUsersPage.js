import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao obter usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdateUser = async (userId) => {
    try {
      const response = await axios.put(`http://localhost:5000/users/${userId}`, {});
      console.log('Usuário atualizado com sucesso:', response.data);
      navigate(`/profile/${userId}`);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/users/${userId}`);
      console.log('Usuário excluído com sucesso:', userId);
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Erro ao excluir usuário:', error);
    }
  };

  // Verifica se o usuário tem permissão de administrador com base nas informações do token
  const isAdmin = () => {
    // Obtenha as informações do token do local session
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    // Decodifique o token para obter as informações do payload
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log(payload)
    // Verifique se o nível de acesso é 'admin'
    return payload.nivel_acesso === 'admin';
  };

  // Configuração do interceptor para adicionar o token ao cabeçalho de todas as solicitações axios
  axios.interceptors.request.use(
    config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

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
                {/* Condicional para mostrar os botões com base no nível de acesso do usuário */}
                {isAdmin() && (
                  <>
                    <button className="btn btn-primary me-2" onClick={() => handleUpdateUser(user.id)}>Atualizar</button>
                    <button className="btn btn-danger" onClick={() => handleDeleteUser(user.id)}>Excluir</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsersPage;