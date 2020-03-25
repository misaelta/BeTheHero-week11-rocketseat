const connection = require('../database/connection')
module.exports={

    async create(request , response){
        const{ title,description ,value}=request.body;
        const ong_id=request.headers.auth

       const [id]= await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })
        return response.json({id})
    }
,
    async index(request,response){
        const incidents = await connection('incidents').select('*');
        return response.json(incidents)
    },

    async delete(request,response){
    const{id} = request.params;
    const ong_id=request.headers.auth

    const incident = await connection('incidents')
    .where ('id',id)
    .select('ong_id')
    .first();

    if(incident.ong_id!= ong_id){
        return response.status(401).json({error:"Operação naõ permitida"})
    }

    await connection('incidents').where('id',id).delete();
    return response.status(204).send(); 
    }
}