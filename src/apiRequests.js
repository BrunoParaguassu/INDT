const axios = require('axios');

// URL base da API
const baseURL = 'http://localhost:5000'; // Altere a porta conforme necessário

// Função para fazer uma requisição GET para obter todos os usuários
async function getUsers() {
    try {
        const response = await axios.get(`${baseURL}/users`);
        console.log('Lista de Usuários:', response.data);
    } catch (error) {
        console.error('Erro ao obter usuários:', error.response.data);
    }
}

// Função para fazer uma requisição POST para fazer login
async function login(email, password) {
    try {
        const response = await axios.post(`${baseURL}/login`, { email, password });
        console.log('Token de Acesso:', response.data.access_token);
    } catch (error) {
        console.error('Erro ao fazer login:', error.response.data);
    }
}

// Função para fazer uma requisição POST para registrar um novo usuário
async function register(firstName, lastName, email, password) {
    try {
        const response = await axios.post(`${baseURL}/register`, { firstName, lastName, email, password });
        console.log('Novo usuário registrado:', response.data);
    } catch (error) {
        console.error('Erro ao registrar novo usuário:', error.response.data);
    }
}

// Chamar as funções para testar as requisições
// getUsers();
// login('email@example.com', 'password');
// register('John', 'Doe', 'john@example.com', 'password');
