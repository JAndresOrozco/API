'use strict'
const User = use('App/Models/User');
let Client = require('node-rest-client').Client;
let user = new User()


class ExamController {
    async signup({request, response}) 
    {
        
        let obj = request.all()

        user.username = obj.username
        user.email = obj.email
        user.password = obj.password

        let req = {
            "client_id":"4LbLtcopZMqvIjT69tKvZchV8TroKA4H",
            "email":obj.email,
            "password":obj.password,
            "connection":"Username-Password-Authentication"
        }

        const args = {
            data: req,
            headers: {
                "Content-Type": "application/json"
            }
        };

        const client = new Client();

        let enviorequest = function() {
            return new Promise(function(resolve, reject){
                client.post("https://dev-wbw8xxhi.auth0.com/dbconnections/signup", args, function(data, res) {
                    resolve(data);
                });
            });
        };

        let result = await enviorequest();

        // return response.status(200).json(result);
        try {
            let data = await user.save()
            if(data) {
                const mailjet = require ('node-mailjet')
        .connect('ac9a095906ea899c812673e290a17f9d', 'e48b648fea6b2a19dad2b952a807583b')
        const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
          "Messages":[
            {
              "From": {
                "Email": "madridkoz@gmail.com",
                "Name": "Andres"
              },
              "To": [
                {
                  "Email": "madridkoz@gmail.com",
                  "Name": "Andres"
                }
              ],
              "Subject": "Registrado con éxito.",
              "TextPart": "My first Mailjet email",
              "HTMLPart": "<h3>Bienvenido a<a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />Disfruta de nuestros servicios!",
              "CustomID": "AppGettingStartedTest"
            }
          ]
        })
        request
          .then((result) => {
            console.log(result.body)
          })
          .catch((err) => {
            console.log(err.statusCode)
          })
                return response.status(201).json(user)
            }
        } catch(error) {
            return response.status(401).json(null)
        }
    }

    async login({request, response, auth}) 
    {
        const {email, password} = request.all();
        const token = await auth.attempt(email,password);
        
        if(token) {
            let req = {
                "client_id":"4LbLtcopZMqvIjT69tKvZchV8TroKA4H",
                "client_secret":"0jDoFQygGGQm5U5g-hA4gtRgrTUaul95dVwoAyJYia-cF9iWEGJOAbK7iJGSTQ1j",
                "audience":"api-rest",
                "grant_type":"client_credentials"
            }

            const args = {               
                data: req,
                headers: { 
                    "Content-Type": "application/json" 
                }
            };

            const client = new Client();  

            let enviorequest = function() {
                return new Promise(function(resolve, reject) {
                    client.post("https://dev-wbw8xxhi.auth0.com/oauth/token", args, function(data) {
                        resolve(data);
                    });
                });
            };

            let result = await enviorequest();
            const auth_token = result.access_token;
            user.auth_token = auth_token;
            const data = await user.save();

            if(data) {
                const mailjet = require ('node-mailjet')
                .connect('ac9a095906ea899c812673e290a17f9d', 'e48b648fea6b2a19dad2b952a807583b')
                const request = mailjet
                .post("send", {'version': 'v3.1'})
                .request({
                  "Messages":[
                    {
                      "From": {
                        "Email": "madridkoz@gmail.com",
                        "Name": "Andres"
                      },
                      "To": [
                        {
                          "Email": "madridkoz@gmail.com",
                          "Name": "Andres"
                        }
                      ],
                      "Subject": "Te haz logueado con éxito.",
                      "TextPart": "My first Mailjet email",
                      "HTMLPart": "<h3>Bienvenido a<a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />Disfruta de nuestros servicios!",
                      "CustomID": "AppGettingStartedTest"
                    }
                  ]
                })
                request
                  .then((result) => {
                    console.log(result.body)
                  })
                  .catch((err) => {
                    console.log(err.statusCode)
                  })
                return response.status(200).json(token); 
            }
        }
    }

    async token({request, response}) 
    {
        let req = {
            "client_id":"4LbLtcopZMqvIjT69tKvZchV8TroKA4H",
            "client_secret":"0jDoFQygGGQm5U5g-hA4gtRgrTUaul95dVwoAyJYia-cF9iWEGJOAbK7iJGSTQ1j",
            "audience":"api-rest",
            "grant_type":"client_credentials"
        }

        const args = {
            data: req,
            headers: {
                "Content-Type": "application/json"
            }
        };

        const client = new Client();

        let enviorequest = function() {
            return new Promise(function(resolve, reject){
                client.post("https://dev-wbw8xxhi.auth0.com/oauth/token", args, function(data, res) {
                    resolve(data);
                });
            });
        };

        let result = await enviorequest();

        return response.status(200).json(result);
    }
    async slack({request,response}){

            let obj = request.all();
    
            let mensaje = obj.msg;
    
            let req = {
                "text": mensaje
            }
    
            const args = {               
                data: req,
                headers: { 
                    "Content-Type": "application/json"
                }
            };
    
            const client = new Client();  
    
            let enviorequest = function() {
                return new Promise(function(resolve, reject) {
                    client.post("https://hooks.slack.com/services/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", args, function(data) {
                        resolve(data);
                    });
                });
            };
    
            let result = await enviorequest();
            const mailjet = require ('node-mailjet')
            .connect('ac9a095906ea899c812673e290a17f9d', 'e48b648fea6b2a19dad2b952a807583b')
            const reque = mailjet
            .post("send", {'version': 'v3.1'})
            .request({
              "Messages":[
                {
                  "From": {
                    "Email": "madridkoz@gmail.com",
                    "Name": "Andres"
                  },
                  "To": [
                    {
                      "Email": "madridkoz@gmail.com",
                      "Name": "Andres"
                    }
                  ],
                  "Subject": "Mensaje enviado con éxito.",
                  "TextPart": "My first Mailjet email",
                  "HTMLPart": "<h3>Mensaje Enviado</h3>",
                  "CustomID": "AppGettingStartedTest"
                }
              ]
            })
            reque
              .then((result) => {
                console.log(result.body)
              })
              .catch((err) => {
                console.log(err.statusCode)
              })
            return response.status(200).json(result);
        }
  
    
    async send({req,response,auth}){
        const mailjet = require ('node-mailjet')
        .connect('ac9a095906ea899c812673e290a17f9d', 'e48b648fea6b2a19dad2b952a807583b')
        const request = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
          "Messages":[
            {
              "From": {
                "Email": "madridkoz@gmail.com",
                "Name": "Andres"
              },
              "To": [
                {
                  "Email": "madridkoz@gmail.com",
                  "Name": "Andres"
                }
              ],
              "Subject": "Greetings from Mailjet.",
              "TextPart": "My first Mailjet email",
              "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
              "CustomID": "AppGettingStartedTest"
            }
          ]
        })
        request
          .then((result) => {
            console.log(result.body)
          })
          .catch((err) => {
            console.log(err.statusCode)
          })
        
      
  }

  async logout({request, response, auth}){
    let user = auth.user;
    let token = await auth.authenticator('api').revokeTokensForUser(user);
    auth.user.auth_token = null;
    const mailjet = require ('node-mailjet')
        .connect('ac9a095906ea899c812673e290a17f9d', 'e48b648fea6b2a19dad2b952a807583b')
        const reque = mailjet
        .post("send", {'version': 'v3.1'})
        .request({
          "Messages":[
            {
              "From": {
                "Email": "madridkoz@gmail.com",
                "Name": "Andres"
              },
              "To": [
                {
                  "Email": "madridkoz@gmail.com",
                  "Name": "Andres"
                }
              ],
              "Subject": "Sesión cerrada",
              "TextPart": "My first Mailjet email",
              "HTMLPart": "<h3>Te vemos pronto</h3>",
              "CustomID": "AppGettingStartedTest"
            }
          ]
        })
        reque
          .then((result) => {
            console.log(result.body)
          })
          .catch((err) => {
            console.log(err.statusCode)
          })
    return response.status(202).json({ "Mensaje": "Sesión cerrada"})

    
  }

}

module.exports = ExamController
