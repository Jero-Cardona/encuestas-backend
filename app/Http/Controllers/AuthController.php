<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Redis;

class AuthController extends Controller
{
    // funcion para registrar de usuarios
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|confirmed',
        ]);
        
        // Crear usuario y encriptar la constraseña
        $user = User::create([
            'name' => $fields['name'],
            'email' => $fields['email'],
            'password' => bcrypt($fields['password']),
        ]);

        // Crear token
        $token = $user->createToken('apptoken')->plainTextToken;

        // retornar usuario y token
        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201); //codigo de estatus 201 created
    }
    
    public function login(Request $request)
    {
        // Validar campos
        $fields = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Buscar usuario
        $user = User::where('email', $fields['email'])->first();

        // Validar usuario y contraseña
        if (!$user || !Hash::check($fields['password'], $user->password)) {
            return response()->json([
                'message' => 'Credenciales incorrectas'
            ], 401);
        }

        // Crear token con Sanctum
        $token = $user->createToken('auth_token')->plainTextToken;

        // Respuesta
        return response()->json([
            'message' => 'Inicio de sesión exitoso',
            'user' => $user,
            'token' => $token,
            'token_type' => 'Bearer'
        ], 200);
    }

    
    // Funcion para cerrar sesion
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Cierre de sesión exitoso']);
    }

    // Funcion para ver el usuario autenticado
    public function me(Request $request)
    {
        return $request->user();
    }
}
