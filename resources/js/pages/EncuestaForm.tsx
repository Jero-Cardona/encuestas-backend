import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function EncuestaForm() {
    const [formData, setFormData] = useState({
        frameworkFavorito: '',
        experienciaReact: '',
        lenguajes: [] as string[],
        trabajoEnEquipo: 3,
        metodologiasAgiles: '',
    });

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setFormData((prev) => {
            const lenguajes = checked
                ? [...prev.lenguajes, value]
                : prev.lenguajes.filter((lang) => lang !== value);
            return { ...prev, lenguajes };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post('/api/encuesta', {
            respuestas: formData,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white dark:bg-black/2 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Encuesta Técnica</h2>

            {/* 1. Pregunta abierta */}
            <div>
                <label className="block font-medium mb-2">¿Cuál es tu framework favorito y por qué?</label>
                <textarea
                    className="w-full border rounded p-2"
                    rows={4}
                    value={formData.frameworkFavorito}
                    onChange={(e) => setFormData({ ...formData, frameworkFavorito: e.target.value })}
                    required
                />
            </div>

            {/* 2. Pregunta opción única */}
            <div>
                <label className="block font-medium mb-2">¿Cuál es tu nivel de experiencia en React?</label>
                {['Junior', 'Mid', 'Senior'].map((nivel) => (
                    <label key={nivel} className="inline-flex items-center mr-4">
                        <input
                            type="radio"
                            name="experienciaReact"
                            value={nivel}
                            checked={formData.experienciaReact === nivel}
                            onChange={(e) => setFormData({ ...formData, experienciaReact: e.target.value })}
                            required
                        />
                        <span className="ml-2">{nivel}</span>
                    </label>
                ))}
            </div>

            {/* 3. Selección múltiple */}
            <div>
                <label className="block font-medium mb-2">¿Qué lenguajes de programación conoces?</label>
                {['JavaScript', 'PHP', 'Python', 'Java'].map((lenguaje) => (
                    <label key={lenguaje} className="block">
                        <input
                            type="checkbox"
                            value={lenguaje}
                            checked={formData.lenguajes.includes(lenguaje)}
                            onChange={handleCheckboxChange}
                        />
                        <span className="ml-2">{lenguaje}</span>
                    </label>
                ))}
            </div>

            {/* 4. Escala numérica */}
            <div>
                <label className="block font-medium mb-2">
                    En una escala del 1 al 5, ¿qué tanto te gusta trabajar en equipo?
                </label>
                <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData.trabajoEnEquipo}
                    onChange={(e) =>
                        setFormData({ ...formData, trabajoEnEquipo: parseInt(e.target.value) })
                    }
                    className="w-full"
                />
                <p className="text-sm">Valor: {formData.trabajoEnEquipo}</p>
            </div>

            {/* 5. Sí/No */}
            <div>
                <label className="block font-medium mb-2">¿Has trabajado con metodologías ágiles?</label>
                {['Sí', 'No'].map((opcion) => (
                    <label key={opcion} className="inline-flex items-center mr-4">
                        <input
                            type="radio"
                            name="metodologiasAgiles"
                            value={opcion}
                            checked={formData.metodologiasAgiles === opcion}
                            onChange={(e) => setFormData({ ...formData, metodologiasAgiles: e.target.value })}
                            required
                        />
                        <span className="ml-2">{opcion}</span>
                    </label>
                ))}
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400 transition"
            >
                Enviar respuestas
            </button>
        </form>
    );
}
