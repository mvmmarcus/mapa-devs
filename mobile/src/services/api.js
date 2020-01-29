// pasta padrao para importar api
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.56.1:3333', //esse ip é o padrao para emulador de android (a porta é a msm que definimos no back)
});

export default api;