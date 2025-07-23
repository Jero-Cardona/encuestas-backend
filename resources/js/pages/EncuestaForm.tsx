import React, { useState, FormEventHandler } from 'react';
import { router } from '@inertiajs/react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';


type EncuestasForm = {
    frameworkFavorito: string,
    experienciaReact: string,
    lenguajes: string[],
    trabajoEnEquipo: number,
    metodologiasAgiles: string,
}


export default function EncuestaForm() {
    // const [data, setdata] = useState({
    //     frameworkFavorito: '',
    //     experienciaReact: '',
    //     lenguajes: [] as string[],
    //     trabajoEnEquipo: 3,
    //     metodologiasAgiles: '',
    // });

    const { data, setData, post, processing, errors, reset } = useForm<Required<EncuestasForm>>({
        frameworkFavorito: '',
        experienciaReact: '',
        lenguajes: [] as string[],
        trabajoEnEquipo: 3,
        metodologiasAgiles: '',
    });

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setData((prev) => {
            const lenguajes = checked
                ? [...prev.lenguajes, value]
                : prev.lenguajes.filter((lang) => lang !== value);
            return { ...prev, lenguajes };
        });
    };

    const handleSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        // router.post('api/encuesta', {
        //     respuestas: data,
        // });
        
        post(route('encuesta'))
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
                    value={data.frameworkFavorito}
                    onChange={(e) => setData({ ...data, frameworkFavorito: e.target.value })}
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
                            checked={data.experienciaReact === nivel}
                            onChange={(e) => setData({ ...data, experienciaReact: e.target.value })}
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
                            checked={data.lenguajes.includes(lenguaje)}
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
                    value={data.trabajoEnEquipo}
                    onChange={(e) =>
                        setData({ ...data, trabajoEnEquipo: parseInt(e.target.value) })
                    }
                    className="w-full"
                />
                <p className="text-sm">Valor: {data.trabajoEnEquipo}</p>
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
                            checked={data.metodologiasAgiles === opcion}
                            onChange={(e) => setData({ ...data, metodologiasAgiles: e.target.value })}
                            required
                        />
                        <span className="ml-2">{opcion}</span>
                    </label>
                ))}
            </div>

                    <Button type="submit" className="mt-4 w-full cursor-pointer" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        enviar
                    </Button>
        </form>
    );
}
