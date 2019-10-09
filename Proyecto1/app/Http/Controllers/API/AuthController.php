<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
// use \App\User;

class AuthController extends Controller
{

    // public function test(Request $request){
    //     $variable = $request->get('args');
    //     $extra = \array_merge($variable['data']);
    //     return response()->json(['data']);
    // }
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
            $user->username = $request->username;
            $user->email = $request->email;
            $user->password = bcrypt($request->password); //bcrypt para crear el hash del password
            if($user->save())
                return response()->json($user, 201);
                return response()->json(null, 204);
            
    }

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
            $user = new \App\User();
            
            $user->username     = $request->username;
            $user->email    = $request->email;
            $user->password = bcrypt($request->password);
            
            $body = array(
                "username" => $user->username,
                "email" => $user->email,
                "password" => $request->password,
                
            );
            $client = new \GuzzleHttp\Client(['base_uri' => 'http://127.0.0.1:3333/api/v1']);
            $response = $client->post('http://127.0.0.1:3333/api/v1/login',
            [ 'form_params' => $body ]);
                
                $res= (string) $response->getBody();
                $json = json_decode($res);
                $var = $json ->token;

            $token =Str::random(60);
            $request->user()->forceFill([
                'api_token'=>hash('sha256',$token),
                'token_adonis' => $var

            ])->save();
            
            return array('tokenlaravel' => $token);
            
        }
        \Abort(401);
        
    }
    public function alllogout(Request $request){
        $var = $request->user()->token_adonis;

        $request->user()->forceFill([
            'api_token' => null,
            'token_adonis' => null
        ])->save();

        $client = new \GuzzleHttp\Client(['base_uri' => 'http://127.0.0.1:3333/api/v1']);
        $response = $client->post('http://127.0.0.1:3333/api/v1/logout',
        [
            'headers' => ['Authorization' => 'Bearer ' . $var]
        ]);

        return $response->getBody();
    }
    public function alltoDo(Request $request){
 $var = $request->user()->token_adonis;

        //Ultimo lanzamiento
        $client = new \GuzzleHttp\Client(['base_uri' => 'https://api.spacexdata.com/v3/launches/latest']);
        $response = $client->post('https://api.spacexdata.com/v3/launches/latest',
        [
            'headers' => ['Authorization' => 'Bearer ' . $var]
        ]);


    }

        public function ultimolanzamiento(Request $request){
            $var = $request->user()->token_adonis;
            $client = new \GuzzleHttp\Client(['base_uri' => 'https://api.spacexdata.com/v3/launches/latest']);
            $response = $client->post('https://api.spacexdata.com/v3/launches/latest',
            [
                'headers' => ['Authorization' => 'Bearer ' . $var]
            ]);
            return $response->getBody();
        }

        public function capsulas(Request $request){
            $var = $request->user()->token_adonis;
            $client = new \GuzzleHttp\Client(['base_uri' => 'https://api.spacexdata.com/v3/capsules']);
        $response = $client->post('https://api.spacexdata.com/v3/capsules',
        [
            'headers' => ['Authorization' => 'Bearer ' . $var]
        ]);
        return $response->getBody();
        }

        public function historia(Request $request){
            $var = $request->user()->token_adonis;
            $client = new \GuzzleHttp\Client(['base_uri' => 'https://api.spacexdata.com/v3/history']);
        $response = $client->post('https://api.spacexdata.com/v3/history',
        [
            'headers' => ['Authorization' => 'Bearer ' . $var]
        ]);
        return $response->getBody();

        }
        public function misiones(Request $request){
            $var = $request->user()->token_adonis;

           $id = $request ->id;
        $client = new \GuzzleHttp\Client(['base_uri' => 'https://api.spacexdata.com/v3/missions']);
        $response = $client->get('https://api.spacexdata.com/v3/missions/'.$id,
        [
            'headers' => ['Authorization' => 'Bearer ' . $var]
        ]);
        return $response->getBody();
        }

        public function rockets(Request $request){
            $var = $request->user()->token_adonis;

           
        $client = new \GuzzleHttp\Client(['base_uri' => 'https://api.spacexdata.com/v3/rockets']);
        $response = $client->get('https://api.spacexdata.com/v3/rockets',
        [
            'headers' => ['Authorization' => 'Bearer ' . $var]
        ]);
        return $response->getBody();
        }

        public function UpcomingLaunches(Request $request){
            $var = $request->user()->token_adonis;

        $client = new \GuzzleHttp\Client(['base_uri' => 'https://api.spacexdata.com/v3/launches/upcoming']);
        $response = $client->get('https://api.spacexdata.com/v3/launches/upcoming',
        [
            'headers' => ['Authorization' => 'Bearer ' . $var]
        ]);
        return $response->getBody();
        }


        public function info(Request $request){
            $var = $request->user()->token_adonis;

        $client = new \GuzzleHttp\Client(['base_uri' => 'https://api.spacexdata.com/v3/info']);
        $response = $client->get('https://api.spacexdata.com/v3/info',
        [
            'headers' => ['Authorization' => 'Bearer ' . $var]
        ]);
        return $response->getBody();
        }

        public function marvels(Request $request){
            $var = $request->user()->token_adonis;
           
                   
            $client = new \GuzzleHttp\Client(['base_uri' => 'https://127.0.0.1:3333/api/v1/marvel']);
            $response = $client->get('https://127.0.0.1:3333/api/v1/marvel',
            [
                       'headers' => ['Authorization' => 'Bearer ' . $var]
            ]);
           
            return $response->getBody();
        }
    

}
