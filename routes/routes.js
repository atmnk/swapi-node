var appRouter = function (app) {
    app.get("/people", function(req, res) {
      var people = require('../fixtures/people.json').map((person)=>{
        person.fields["id"]=person.pk
        return person.fields;
      });
      res.status(200).send({"results":people});
    });
  }
  
  module.exports = appRouter;