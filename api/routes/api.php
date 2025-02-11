<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\RolePermissionController;
use App\Http\Controllers\UserAccessController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group([
    //'middleware' => 'auth:api',
    'prefix' => 'auth',
    //'middleware' => ['auth:api', 'role:admin'], // Comprobar si el usuario está autenticado y es Super-Admin
], function ($router) {
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('/refresh', [AuthController::class, 'refresh'])->name('refresh');
    Route::post('/me', [AuthController::class, 'me'])->name('me');
});


Route::group([
    'middleware' => 'auth:api',
], function ($router) {
    Route::resource('roles', RolePermissionController::class);
    Route::resource('users', UserAccessController::class);
    Route::post('/users/{id}', [UserAccessController::class, 'update']);
});