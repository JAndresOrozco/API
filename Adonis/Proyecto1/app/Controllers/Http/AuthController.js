'use strict'

const User = use('App/Models/User');
class AuthController {

    async register({request, response}){

      let user = new User();
      let objeto = request.all();

      user.username = objeto.username;
      user.email = objeto.email;
      user.password = objeto.password;
    try{
      let data = await user.save();
      if(data)
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
      //   return response.status(200).json({'msg':'Hola Mundo'})
      // }
      
      // async loginall({request,response,auth}){
      //   let objeto = request.all();
      //   try{
      //     const token = await auth.attempt(objeto.email, objeto.password);
      //     return response.status(201).json(token);
      //   }catch(error){
      //     return response.status(401).json({mensaje:'peligro', error:error});
        
      //   }
      // }
  }

module.exports = AuthController
