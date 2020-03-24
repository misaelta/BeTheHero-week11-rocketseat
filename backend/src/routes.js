const express= require('express')

const routes = express.Router();

routes.get('/ongs',(request,response)=>{

const ong = request.body

return response.send('hello')

})







module.exports= routes
