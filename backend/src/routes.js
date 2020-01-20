const { Router } = require('express');

const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index); // nao tem problema ser a mesma rota, desde que os metodos sejão diferentes
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);

module.exports = routes;