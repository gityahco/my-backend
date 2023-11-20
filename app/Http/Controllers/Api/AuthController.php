<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function Signup(SignupRequest $request)
    {
        $data = $request -> Validated();
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        $token = $user -> createToken('main') -> plainTextToken;
        return response(compact('user', 'token'));
    }
    public function Login(LoginRequest $request)
    {
        $credentials = $request -> validated();
        if (!Auth::attempt($credentials)) {
            return response(
                ['message' => 'provided email address or password is incorrect']
            );
        }
        /** @var User $user */
        $user = Auth::user();
        $token = $user-> createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
    }
    public function Logout(Request $request)
    {
        $user = $request-> user();
        $user -> currentAccessToken()->delete();
        return response('', 204);
    }
}
