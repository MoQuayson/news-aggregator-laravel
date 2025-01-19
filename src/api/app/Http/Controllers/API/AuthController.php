<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use App\Services\UserService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(protected AuthService $authService,protected UserService $userService)
    {

    }
    public function login(LoginRequest $request){
        //authenticate user
        if($this->authService->authenticateUser($request) == false){
            return response()->json([
                'code'=> 401,
                'message' => "invalid credentials"
            ],401);
        }

        //get user by email
        $user = $this->userService->getUserByEmail($request->email);
        //generate access token
        $accessToken = $this->authService->generateToken($user);
        $user->token = $accessToken;

        return response()->json([
            'code' => 200,
            'message'=> 'user authenticated successfully',
            'data'=> $user
        ],200);
    }

    public function register(RegisterRequest $request){
        //create new user
        $isCreated = $this->userService->createNewUser($request);
        if(!$isCreated){
            return $this->serverErrorResponse('failed to register user.try again later');
        }

        //get user by email
        $user = $this->userService->getUserByEmail($request->email);
        //generate access token
        $accessToken = $this->authService->generateToken($user);
        $user->token = $accessToken;

        return response()->json([
            'code' => 201,
            'message'=> 'user created successfully',
            'data'=> $user
        ],201);
    }
}
