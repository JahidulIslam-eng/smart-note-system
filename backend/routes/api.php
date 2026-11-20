<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegistrationController;


Route::post('/register', [RegistrationController::class, 'register']);

Route::post('/login', [LoginController::class, 'login']);


// Protected routes
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/logout', function (Request $request) {

        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout successful!',
        ]);
    });

    // Future protected APIs
    // Route::apiResource('/notes', NoteController::class);
    // Route::apiResource('/tasks', TaskController::class);

});