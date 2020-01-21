import axios from 'axios';

const api = axios.create({ // criando um obejto axios para acessar a nossa api do backend
    baseURL: 'http://localhost:3333' // especidicando o local da api
});

export default api;