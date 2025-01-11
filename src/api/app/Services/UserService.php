<?php

namespace App\Services;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use App\Repositories\UserRepository;

class UserService {
    public function __construct(protected UserRepository $userRepo)
    {

    }

    //getUserByEmail gets user data by email
    public function getUserByEmail(string $email) : User {
        return $this->userRepo->getUserByEmail($email);
    }

    public function createNewUser(RegisterRequest $request):bool{
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        return $this->userRepo->createNewUser($user);
    }


}
