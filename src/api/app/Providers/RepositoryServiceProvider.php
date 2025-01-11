<?php

namespace App\Providers;

use App\Interfaces\IAuthService;
use App\Interfaces\IUserRepository;
use App\Repositories\UserRepository;
use App\Services\AuthService;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        // $this->app->singleton(IUserRepository::class,UserRepository::class);
        // $this->app->singleton(IAuthService::class,AuthService::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
