<?php

namespace App\Providers;

use App\Repositories\UserRepository;
use App\Services\ArticleService;
use App\Services\AuthService;
use App\Services\UserService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepository::class);
        $this->app->bind( AuthService::class);
        $this->app->bind(UserService::class);
        $this->app->bind(ArticleService::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
