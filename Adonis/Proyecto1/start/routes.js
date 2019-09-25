'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
Route.group(() =>{
Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout').middleware(['auth']);
Route.post('/todo', 'AuthController.toDo').middleware(['auth','checkUserIsAdmin']);
Route.post('/loginall', 'AuthController.loginall')

}).prefix('api/v1')













// Route.post('/login', async({request, auth})=>{
// const user = await user.find(1);
// let temp = await auth.generate(user);

// return {data: temp};
// })

// // Route.get('/consumir',async()=>{
// //   return await User.all();

// // }).middleware(['auth:api'])

// Route.post('/logout',async({request, auth})=>{
//   console.log(auth.user)
//   const user = await User.find(1);
//   let temp = await auth.authenticator('api').revokeTokenForUser(user);
//   return {data: temp};
// }).middleware(['auth.api']);