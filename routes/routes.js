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
      personaService.getPersonas(req,res);
    });
    app.get(basePath+"/people/:id", function(req, res) {
      personaService.getPersona(req.params.id,res);
    });
    const allowIf = (req,res,role,method)=>{
      var header = req.header("Authorization")
      var authorized = false;
      var allowed = false;

      if(header){
        var decoded = jwt.verify(header,accessTokenSecret);
        if(decoded){
          authorized = true;
          if(decoded.role==role){
            allowed=true;
            method();
          }
        }
      }
      if(!authorized){
        res
        .status(401)
        .json({
          error: 'UNAUTHORIZED'
        });
      } else if(!allowed){
        res
        .status(403)
        .json({
          error: 'INSUFFICIENT_RIGHTS'
        });
      }
    }
    app.post(basePath+"/people", function(req, res) {
      allowIf(req,res,"admin",()=>{
        var persona = (({ name,
          gender,
          skin_color,
          hair_color,
          eye_color,createdAt,updatedAt }) => ({ name,
            gender,
            skin_color,
            hair_color,
            eye_color,
            createdAt:new Date(),
            updatedAt: new Date()}))(req.body);
        personaService.savePersona(persona,res);
      })
    });


    app.post(basePath+'/login', (req, res) => {
      const { username, password } = req.body;
  
      const user = users.find(u => { return u.username === username && u.password === password });
  
      if (user) {
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