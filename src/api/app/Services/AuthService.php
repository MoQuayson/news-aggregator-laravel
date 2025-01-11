<?php

namespace App\Services;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Auth;

class AuthService{
    public function __construct(protected UserRepository $userRepository) {}
    //authenticateUser verifies user credentials
    public function authenticateUser(LoginRequest $request):bool{
        //get user by email
        $user = $this->userRepository->getUserByEmail($request->email);
        if (!$user){
            return false;
        }

        //check if credentials are valid
        return Auth::attempt(['email'=>$request->email,'password'=>$request->password]);
    }

    //generates access token for user
    public function generateToken(User $user): string{
        return $user->createToken('api_token')->plainTextToken;
    }
}
