<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\CssSelector\Exception\InternalErrorException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            if ($request->is('api/*')) {
                return response(null,404);
            }
        });

        $exceptions->render(function (ValidationException $e, Request $request) {
            return response()->json([
                'code'=>400,
                'message' => $e->getMessage(),
                'errors' => $e->errors(),
            ], 400);
        });

        // $exceptions->render(function (ErrorException $e, Request $request) {
        //     return response()->json([
        //         'code'=>500,
        //         'message' => "failed to complete request. try again later.",
        //     ], 500);
        // });
    })->create();
