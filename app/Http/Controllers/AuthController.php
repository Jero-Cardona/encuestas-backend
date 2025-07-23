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
    
    // funcion para iniciar sesion
    public function login(Request $request)
    {
        $fields = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Verificar si el email existe
        $user = User::where('email', $fields['email'])->first();
        
        // validar si las credenciales son correctas
        if (!$user || Hash::check($fields['password'], $user->password)){
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }

        $token = $user->createToken('apptoken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ]);
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
