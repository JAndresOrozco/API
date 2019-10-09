'use strict'
const User = use('App/Models/Users');
var Client = require('node-rest-client').Client;
var client = new Client();

class UserController {
    async register({request, response}){

        let user = new User();
        let objeto = request.all();
  
        user.username = objeto.username;
        user.email = objeto.email;
        user.password = objeto.password;
      try{
        let data = await user.save();
        if(data)
            var args = {
                data: { username: request.username,
                        email: request.email,
                        password: request.password
                
                }, 
              
                headers: { "Content-Type": "application/json" } // request headers
            };
             
             
            client.post("http://192.168.51.26:8000/api/registro", args,
                function (data, response) {
                   
                    console.log(data);
                 
                    console.log(response);
                });
        return response.status(201).json(user);
        
      }catch(error){
        return response.status(400).json({mensaje:'Información erronea',error:error});
      }
      }
  
      async login({request,response,auth}){
        let objeto = request.all();
        let tokenlaravel = objeto.token;
        try{
          const token = await auth.attempt(objeto.email, objeto.password);
          return response.status(201).json(token, tokenlaravel);
        }catch(error){
          return response.status(401).json({mensaje:'peligro', error:error});
        
        }
      }
  
      async logout({response, auth}) {
        let user = auth.user
         await auth
            .authenticator('api')
            .revokeTokensForUser(user)
          
        return response.status(204).json({
          message: 'Token revokado'})
    }
      
      async toDo({response,auth}){
        return response.status(200).json( await User.all())
    }
    
        // async hola({response}){
        //   return response.status(200).
        }

module.exports = UserController
