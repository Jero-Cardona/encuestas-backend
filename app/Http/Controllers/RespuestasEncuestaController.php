<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RespuestasEncuesta;
use Illuminate\Support\Facades\Auth;


class RespuestasEncuestaController extends Controller
{
    //Guardar las respuestas en la BD
    public function store(Request $request)
    {
        $request->validate([
            'respuestas' => 'required|array',
        ]);

        $user = RespuestasEncuesta::where('user_id', Auth::id())->exists();
        echo($user);
        if ($user){
            return response()->json([
                'message' => 'este usuario ya completo la encuesta.',
            ], 400);
        }
        $respuestas = RespuestasEncuesta::create([
            'user_id' => Auth::id(),
            'respuestas' => $request->input('respuestas'),
        ]);

        return response()->json([
            'message' => 'Respuestas guardadas correctamente.',
            'data' => $respuestas
        ], 201);

    }

    // Consultar respuestas de un usuario autenticado
    public function show(Request $request)
    {
        $respuestas = RespuestasEncuesta::where('user_id', Auth::id())->get();
        return response()->json([
            'data' => $respuestas
        ], 200);
    
    }
}
