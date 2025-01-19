<?php
namespace App\Repositories;

use App\Models\User;


class UserRepository{
    public function getUserByEmail($email) : User | null{
        return User::where('email',$email)->first();
    }

    public function createNewUser(User $user) : bool{
        return $user->save();
    }
}
