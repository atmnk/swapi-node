const personaService = require('./services/persona')
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'This is very secret access token';
var appRouter = function (app) {
  basePath="/api"
  const users = [
        {
            username: 'atmnk',
            password: 'correct',
            role: 'member'
        }, {
            username: 'admin',
            password: 'test123$',
            role: 'admin'
        }
    ];
    app.get(basePath+"/people", function(req, res) {
      personaService.getPersonas(req,res)
      // var people = require('../fixtures/people.json').map((person)=>{
      //   person.fields["id"]=person.pk
      //   return person.fields;
      // });
      // res.status(200).send({"results":people});
    });


    app.post(basePath+'/login', (req, res) => {
      // Read username and password from request body
      const { username, password } = req.body;
  
      // Filter user from the users array by username and password
      const user = users.find(u => { return u.username === username && u.password === password });
  
      if (user) {
          // Generate an access token
          const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);
  
          res.json({
              token: accessToken
          });
      } else {
        res
        .status(404)
        .json({
          error: 'BAD_CREDENTIALS'
        });
      }
  });
  }
  
  module.exports = appRouter;