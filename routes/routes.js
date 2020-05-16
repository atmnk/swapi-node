var appRouter = function (app) {
    app.get("/", function(req, res) {
      res.status(200).send("First Version of SWAPI API");
    });
  }
  
  module.exports = appRouter;