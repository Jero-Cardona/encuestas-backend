<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RespuestasEncuesta extends Model
{
    // campos del modelo
    protected $fillable = [
        'user_id',
        'respuestas',
        'created_at'
    ];

    // indicar que el campo respuestas es un arreglo
    protected $casts = [
        'respuestas' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
