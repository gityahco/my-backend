<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;
use App\Models\User;


class AuthController extends Controller
{
    public function Signup(SignupRequest $request) {
        $data = $request -> Validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user -> createToken('main') -> plainTextToken;
        return response(compact('user', 'token'));
    }
    public function Login(LoginRequest $request) {

    }
    public function Logout(Request $request) {

    }
}
