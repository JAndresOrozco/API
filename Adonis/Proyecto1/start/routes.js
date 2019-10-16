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
// Route.post('/register', 'UserController.register')
Route.post('/login', 'AuthController.login')
Route.post('/logout', 'AuthController.logout').middleware(['auth']);
Route.get('/todo', 'AuthController.toDo').middleware(['auth','checkUserIsAdmin']);
// Route.post('/loginall', 'AuthController.loginall')
// Route.get('/send', 'AuthController.send').middleware(['auth','checkUserIsAdmin']);
Route.get('/personajes', 'AuthController.personajes').middleware(['auth:api']);
Route.get('/series', 'AuthController.series').middleware(['auth:api']);
Route.get('/comics', 'AuthController.comics').middleware(['auth:api']);
Route.get('/stories', 'AuthController.stories').middleware(['auth:api']);
Route.post('/test', 'AuthController.test');

}).prefix('api/v1');
Route.post('/slack', 'ExamController.slack').middleware(['auth:api']);
Route.post('/send', 'ExamController.send');
Route.post('/token', 'ExamController.token');
Route.post('/signup', 'ExamController.signup');
Route.post('/login', 'ExamController.login');
Route.post('/logout', 'ExamController.logout').middleware(['auth:api']);













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