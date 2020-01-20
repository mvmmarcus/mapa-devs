//geralmente o controller tem 5 funções:
// index (lista), show (unico), store (criar), update (alterar), destroy (deletar)

const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) { // usamos async pq a chamada a api do github pode demorar
        const { github_username, techs, latitude, longitude } = request.body;
    
        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`); // usando crase eu consigo passar uma variavel, que no caso é dinâmica (muda de acordo com o usuário)
            // await pq essa chamada pode demorar
            const { name = login, avatar_url, bio } = apiResponse.data; // name = login , significa se o user nao ter nome no git, seu nome será substituido pelo login
    
            const techsArray = parseStringAsArray(techs);
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude] //longitude tem que vir primeiro, de acordo com a documentação do mongo
            };
    
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }
    
        return response.json(dev);
    }
};