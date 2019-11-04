<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use \App\User;

class DataController extends Controller
{
    public function registro(Request $request){
        $user = new \App\User();
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = bcrypt($request->password); //bcrypt para crear el hash del password
        if($user->save())
            return response()->json($user, 201);
            return response()->json(null, 204);
        
    }
    public function lista(Request $request){
        return response()->json(\App\User::all(),200);
    }

    public function log(Request $request){
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
}
