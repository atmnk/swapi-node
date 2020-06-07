const db = require("../../database/models")
const getPersonas =  (req, res) => {
    db.Persona.findAll().then( (result) => res.status(200).send({"results":result}) )
}
const getPersona =  (id, res) => {
    db.Persona.findByPk(id, { raw : true }).then( (result) => res.status(200).send({"results":result}) )
}
const savePersona =  (persona, res) => {
    
    db.Persona.create(persona).then((result) => res.status(200).send(result));
}
module.exports ={
    getPersonas,  
    savePersona,
    getPersona

  }