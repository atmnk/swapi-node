const db = require("../../database/models")
const getPersonas =  (req, res) => {
    db.Persona.findAll().then( (result) => res.status(200).send({"results":result}) )
}
module.exports ={
    getPersonas,   
  }