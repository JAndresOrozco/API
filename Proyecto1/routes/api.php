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
Route::middleware('auth:api', 'isAdmin')->post('/alltodo', 'API\AuthController@alltoDo');


Route::middleware('auth:api')->get('/result', function (Request $request) {
    $user = $request->user();

    return 'Hola, ' .$user['email'];

    // kcWcwhBCISyNB5Zk1Q8aBSILg5eDlQr58ye7BVPYL2wR23L20SlMPpqqWxem
});

// Route::post('/hola',function(){
//     $token = Str::random(60);
//     $user = \App\User::find(1);
//     $user->api_token = hash('sha256', $token); 
//     $user->save();
//     return ['token' => $token];
// });


