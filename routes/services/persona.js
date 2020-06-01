import db from "../../database/models"
const getPersonas =  (req, res) => {
    db.User.findAll().then( (result) => res.status(200).send({"results":result}) )
}
module.exports ={
    getPersonas,   
  }