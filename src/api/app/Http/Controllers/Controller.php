<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\JsonResponse;

abstract class Controller
{
    //use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function successResponse(mixed $data = null, string $message, int $code = 200): JsonResponse
    {
        return response()->json([
            'code' => $code,
            'message' => $message,
            'data' => $data,
        ], $code);
    }

    public function serverErrorResponse(string $message,int $code = 500): JsonResponse
    {
        return response()->json([
            'code' => $code,
            'message' => $message,
        ], $code);
    }
}
