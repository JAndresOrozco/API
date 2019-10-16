'use strict'

const User = use('App/Models/User');
var Client = require('node-rest-client').Client;
const Database = use('Database')
const user = new User();
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
      
      async comics({response,request}){
        let token = '595a727740be5712eb2f1b8919a9e6eb';
        let hash = '02e51458a2a328bbf58a87d961b28916';
        // let comics= request=idcomics;
            const args = {               
                
                headers: { 
                    "Content-Type": "application/json"
                }
            };
    
            const client = new Client();  
    
            let enviorequest = function() {
                return new Promise(function(resolve, reject) {
                    client.get("https://gateway.marvel.com:443/v1/public/comics?ts=1"+"&apikey="+token+"&hash="+hash, args, function(data) {
                        resolve(data);
                    });
                });
            };
    
            let result = await enviorequest();
        return response.status(200).json(result)
    }

    async personajes({request, response}) {
      let obj = request.all();

      const args = {
          headers: { 
              "Content-Type": "application/json"
          }
      };

      const client = new Client()
      let apikey = "e211b4941f8a2f99b907a270cd6210b6"
      let hash = "36629bda9a0995adf927a580b3e443ea"
      let personaje = obj.personaje

      let enviorequest = function() {
          return new Promise(function(resolve, reject) {
              client.get("http://gateway.marvel.com/v1/public/characters?ts=1&name="+personaje+"&apikey="+apikey+"&hash="+hash, args, function(data) {
                  resolve(data);
              });
          });
      };

      let result = await enviorequest();
      
      let name = result.data.results[0]

      return response.status(200).json(name);
  }
  
  async series({response,request}){
    let token = '595a727740be5712eb2f1b8919a9e6eb';
    let hash = '02e51458a2a328bbf58a87d961b28916';
    
        const args = {               
            
            headers: { 
                "Content-Type": "application/json"
            }
        };

        const client = new Client();  

        let enviorequest = function() {
            return new Promise(function(resolve, reject) {
                client.get("https://gateway.marvel.com:443/v1/public/series?ts=1"+"&apikey="+token+"&hash="+hash, args, function(data) {
                    resolve(data);
                });
            });
        };

        let result = await enviorequest();
    return response.status(200).json(result)
}

async stories({response,request}){
  let token = '595a727740be5712eb2f1b8919a9e6eb';
  let hash = '02e51458a2a328bbf58a87d961b28916';
  
      const args = {               
          
          headers: { 
              "Content-Type": "application/json"
          }
      };

      const client = new Client();  

      let enviorequest = function() {
          return new Promise(function(resolve, reject) {
              client.get("https://gateway.marvel.com:443/v1/public/stories?ts=1"+"&apikey="+token+"&hash="+hash, args, function(data) {
                  resolve(data);
              });
          });
      };

      let result = await enviorequest();
  return response.status(200).json(result)
}


    async test({response}){
    // const user = await User.find(3)
    // const datos = await user.datosPersonales().fetch();
    // user.datos_personales = datos;
    
    const user = await Database.table('users').select('*').innerJoin('datos_personales as da','da.user_id','users.id')

    return response.status(200).json(user)
    }

    
    





















    // async marvel({response,auth}){

    //   const args = {               
    //                 data: request.all(),
    //                 headers: { 
    //                     "Content-Type": "application/json" ,
    //                     "Authorization" : "Bearer".user.adonis_token,
    //                 }
                        
    //             };
    //             const client = new Client();  
    //             let enviorequest = function(){
    //                 return new Promise(function(resolve, reject){
    //                     client.post("https://api.spacexdata.com/v3/info",args,function(data, res){
    //                         resolve(data);
                            
    //                         //console.log(data);
    //                         //console.log(res);
    //                     });
    //                 });
    //             };
    //             let result = await enviorequest();
    //             let adonis_token = result;
    //             user.adonis_token = adonis_token;
    //             const data = await user.save(); 
    //             return response.status(200).json(result); 
    // }
    // async send ({request,response}) {
    //   const objeto = request.all();
    //   console.log(objeto)
    //   try {
    //   var options = {
    //       method: 'POST',
    //       // uri: 'https://jsonplaceholder.typicode.com/posts',
    //       uri: 'https://api.spacexdata.com/v3/info',
    //       resolveWithFullResponse: true,   //  <---  <---  <---  <---
    //       form: {
    //           username: objeto.username,
    //           email: objeto.email,
    //           password: objeto.password,
    //           username: objeto.username 
    //       },
    //   };
    //   rp(options)
    //       .then(function (res) {
    //           console.log(res.body)  
    //       })
    //       .catch(function (err) {
    //           // Delete failed...
    //       });

    //       const user = new User()
    //       user.email = objeto.email;
    //       user.username = objeto.username;
    //       user.password = objeto.password;
    //       let g=await user.save()
    //   }
    //   catch(e)
    //   {

    //   }

    //   // test succesful
      

    // }


//   async register ({request, response}){
//     const objeto = request.all()
    
//     user.username = objeto.username;
//     user.password = objeto.password;
//     user.email = objeto.email;
//     const data = await user.save(); 
    
//     const args = {               
//         data: objeto/*{ 
//                 username: request.username,
//                 password: request.password,
//                 email: request.email,
                    
//             }*/,
//             headers: { "Content-Type": "application/json" },
                
//         };
    
//     const client = new Client();  
//     let enviorequest = function(){
//         return new Promise(function(resolve, reject){
//             client.post("http://192.168.51.26:8000/api/register",args,function(data, res){
//                 resolve(data);
//             });
//         });
//     };
//     let result = await enviorequest();
//     return response.status(200).json(result);
    
//     }

//     async login({request,response,auth}){
//       const {email,password} = request.all();
//       //const user = request.user;
//       const token = await auth.attempt(email,password);
//       if(token){
//           const args = {               
//               data: request.all(),
//               headers: { "Content-Type": "application/json" },
                  
//           };
//           const client = new Client();  
//           let enviorequest = function(){
//               return new Promise(function(resolve, reject){
//                   client.post("http://192.168.51.26:8000/api/login",args,function(data, res){
//                       resolve(data);

                      
//                   });
//               });
//           };
//           let result = await enviorequest();
//           let adonis_token = result;
//           user.adonis_token = adonis_token;
//           const data = await user.save(); 
//           /*if(data){
//             return response.status(200).json(data);
//           }*/
          
//           return response.status(200).json(token); 
          
//       }

//   }

//   async logout ({request,response,auth}){
//     let user = await auth.getUser()
    
   
//     // await auth.authenticator('api').revokeTokens([apiToken]);
//     const args = {               
//             data: request.all(),
//             headers: { 
//                 "Content-Type": "application/json" ,
//                 "Authorization" : "Bearer".user.adonis_token,
//             }
                
//         };
//         const client = new Client();  
//         let enviorequest = function(){
//             return new Promise(function(resolve, reject){
//                 client.post("http://192.168.51.26:8000/api/logout",args,function(data, res){
//                     resolve(data);
                    
//                     //console.log(data);
//                     //console.log(res);
//                 });
//             });
//         };
//         let result = await enviorequest();
//         let adonis_token = null;
//         user.adonis_token = adonis_token;
//         const data = await user.save();
//         await auth.authenticator("api").revokeTokensForUser(user);
//         return response.status(201).json(result);
// }
    
//     async toDo({response,auth}){
//       return response.status(200).json( await User.all())
//   }
  
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
