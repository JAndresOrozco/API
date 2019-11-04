<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/registro','API\AuthController@registro');
Route::post('/login','API\AuthController@login');
Route::middleware('auth:api')->post('/logout', 'API\AuthController@logout');
Route::middleware(['auth:api','isAdmin'])->post('/todo', 'API\AuthController@toDo');
Route::post('/allregister', 'API\AuthController@allregister');
Route::post('/alllogin', 'API\AuthController@alllogin');
// Route::get('/alllogout', 'API\AuthController@alllogout');
// Route::get('/alltodo', 'API\AuthController@alltoDo');
Route::middleware('auth:api')->post('/alllogout', 'API\AuthController@alllogout');
Route::middleware('auth:api', 'isAdmin')->get('/alltodo', 'API\AuthController@alltoDo');
Route::post('/validar','API\AuthController@validar');
Route::post('/test', 'API\AuthController@test');

//Android
Route::post('/registroandroid','API\DataController@registro');
Route::post('/log','API\DataController@log');
Route::middleware(['auth:api','isAdmin'])->post('/lista', 'API\AuthController@lista');
//LaravelSpaceX
Route::middleware('auth:api', 'isAdmin')->get('/ultimolanzamiento', 'API\AuthController@ultimolanzamiento');
Route::middleware('auth:api', 'isAdmin')->get('/capsulas', 'API\AuthController@capsulas');
Route::middleware('auth:api', 'isAdmin')->get('/historia', 'API\AuthController@historia');
Route::middleware('auth:api', 'isAdmin')->get('/misiones', 'API\AuthController@misiones');
Route::middleware('auth:api', 'isAdmin')->get('/rockets', 'API\AuthController@rockets');
Route::middleware('auth:api', 'isAdmin')->get('/UpcomingLaunches', 'API\AuthController@UpcomingLaunches');
Route::middleware('auth:api', 'isAdmin')->get('/info', 'API\AuthController@info');

//AdonisMarvel
Route::middleware('auth:api', 'isAdmin')->get('/marvels', 'API\AuthController@marvels');


// Route::middleware('auth:api')->get('/result', function (Request $request) {
//     $user = $request->user();

//     return 'Hola, ' .$user['email'];

    // kcWcwhBCISyNB5Zk1Q8aBSILg5eDlQr58ye7BVPYL2wR23L20SlMPpqqWxem
// });

// Route::post('/hola',function(){
//     $token = Str::random(60);
//     $user = \App\User::find(1);
//     $user->api_token = hash('sha256', $token); 
//     $user->save();
//     return ['token' => $token];
// });


