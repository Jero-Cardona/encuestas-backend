<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RespuestasEncuestaController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// rutas protegidas por el middleware de sanctum
Route::middleware('auth:sanctum')->group(function(){
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

// routes para la encuesta
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/encuesta', [RespuestasEncuestaController::class, 'store']);
    Route::get('/encuesta', [RespuestasEncuestaController::class, 'show']);
}); 


// ruta dashboard
Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});