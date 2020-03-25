const express= require('express')
const OngController = require('./controllers/OngController')
const incidentsController = require('./controllers/incidentsController')
const profileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')


const routes = express.Router();


routes.get('/ongs',OngController.index);
routes.get('/incidents',incidentsController.index);
routes.post('/ongs',OngController.create);
routes.post('/sessions',SessionController.create)
routes.post('/incidents',incidentsController.create);
routes.get('/profile',profileController.index);
routes.delete('/incidents/:id',incidentsController.delete);









module.exports= routes
