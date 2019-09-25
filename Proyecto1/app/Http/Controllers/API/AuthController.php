<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
// use \App\User;

class AuthController extends Controller
{
    public function toDo(Request $request){
        return response()->json(\App\User::all(),200);
    }

    public function logout(Request $request){
        $request->user()->forceFill([
            'api_token'=> null,
        ])->save();
        \Abort(204);  //codigo de status

    }

    public function login(Request $request){
        $credenciales = ["email"=>$request->email, "password"=>$request->password];
        if(Auth::once($credenciales)){
            $token =Str::random(60);
            $request->user()->forceFill([
                'api_token'=>hash('sha256',$token),
            ])->save();
            return response()->json(['token'=>$token],201);
        }
        \Abort(401);  //codigo de status
    }
    public function registro(Request $request){
            $user = new \App\User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = bcrypt($request->password); //bcrypt para crear el hash del password
            if($user->save())
                return response()->json($user, 201);
                return response()->json(null, 204);
            
    }

    // public function conregister(Request $request){
    //     $client = new \GuzzleHttp\Client(['base_uri'=> 'http://127.0.0.1:3333/']);
    //     $response = $client->request('POST', 'register');

    //     return $response->getBody();
    // }

    public function allregister(Request $request){
        $user = new \App\User();

        $user->username     = $request->username;
        $user->email    = $request->email;
        $user->password = bcrypt($request->password);

        if($user->save()){

            $body = array(
                "username" => $user->username,
                "email" => $user->email,
                "password" => $request->password
            );
            
            $client = new \GuzzleHttp\Client(['base_uri' => 'http://127.0.0.1:3333/api/v1']);
            $response = $client->post('http://127.0.0.1:3333/api/v1/register',
            [
                'form_params' => $body
            ]);
    
            return $response->getBody();

        }else{
            return response()->json(null,204);
        }
    }

    public function alllogin(Request $request){
        $credenciales = ["email"=>$request->email, "password"=>$request->password];
    
        if(Auth::once($credenciales)){
            $token =Str::random(60);
            $request->user()->forceFill([
                'api_token'=>hash('sha256',$token),
            ])->save();

            $client = new \GuzzleHttp\Client(['base_uri' => 'http://127.0.0.1:3333/api/v1']);
            $response = $client->post('http://127.0.0.1:3333/api/v1/loginall',
            [
                'form_params' => $credenciales
            ]);
            // return response()->json(['token'=>$token],201);
            return $response->getBody();
        }
        \Abort(401);  //codigo de status
    }

    public function alllogout(Request $request){
        $request->user()->forceFill([
            'api_token'=> null,
        ])->save();
        $client = new \GuzzleHttp\Client(['base_uri' => 'http://127.0.0.1:3333/api/v1']);
            $response = $client->post('http://127.0.0.1:3333/api/v1/logout',
            [
                'form_params' => $request
            ]);
        \Abort(204);  //codigo de status
        return $response->getBody();

    }
    }

