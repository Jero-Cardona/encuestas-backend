# Microaplicación de Encuestas 📑

## Tecnologías Utilizadas

<div align="center">
  
### Laravel Framework 12.20.0
<img width="100" height="100" alt="laravel" src="https://github.com/user-attachments/assets/96cd666d-3ff7-4335-a2c2-824be4588f37" />

### React 19.0.0
<img width="100" height="100" alt="react" src="https://github.com/user-attachments/assets/22ae75d8-c731-48c6-90b7-4ca6c7827c65" />

### PostgreSQL 17.4
<img width="100" height="100" alt="postgres" src="https://github.com/user-attachments/assets/6ad1095d-f53a-42a1-924e-224b6c53cafc" />

</div>

## Requisitos Previos

- PHP >= 8.2
- Composer
- Node.js >= 18
- PostgreSQL 17.4
- Git

## Instalación y Configuración

### 1. Instalación Inicial

```bash
# Instalar Laravel globalmente (si no lo tienes)
composer global require laravel/installer

# Crear el proyecto
laravel new encuestas-app
cd encuestas-app
```

### 2. Configuración de Dependencias

```bash
# Instalar Laravel Sanctum para autenticación API
composer require laravel/sanctum

# Publicar configuración de Sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"

# Instalar dependencias de Node.js
npm install
```

### 3. Configuración de Base de Datos

```bash
# Copiar archivo de configuración
cp .env.example .env

# Generar clave de aplicación
php artisan key:generate

# Configurar base de datos en .env
# DB_CONNECTION=pgsql
# DB_HOST=127.0.0.1
# DB_PORT=5432
# DB_DATABASE=encuestas_db
# DB_USERNAME=tu_usuario
# DB_PASSWORD=tu_contraseña

# Ejecutar migraciones
php artisan migrate

# (Opcional) Ejecutar seeders
php artisan db:seed
```

### 4. Configuración de Laravel Sanctum

```bash
# Migrar tablas de Sanctum
php artisan migrate

# Agregar Sanctum middleware a api.php (si es necesario)
```

## Comandos para Desarrollo

### Opción 1: Ejecutar Backend y Frontend Simultáneamente

```bash
# Comando personalizado que ejecuta todos los servicios
composer run dev
```

Este comando ejecuta automáticamente:
- **Servidor Laravel** en `http://127.0.0.1:8000`
- **Cola de trabajos** para procesamiento en segundo plano
- **Vite (Frontend)** en `http://localhost:5173`

### Opción 2: Ejecutar Servicios Individualmente

```bash
# Backend Laravel
php artisan serve

# Frontend React con Vite
npm run dev

# Cola de trabajos (en otra terminal)
php artisan queue:listen --tries=1
```

### Opción 3: Usando Concurrently (Manual)

```bash
npx concurrently -c "#93c5fd,#c4b5fd,#fdba74" \
  "php artisan serve" \
  "php artisan queue:listen --tries=1" \
  "npm run dev" \
  --names='server,queue,vite'
```

## URLs de Acceso

- **Aplicación Laravel**: http://127.0.0.1:8000
- **Frontend React**: http://localhost:5173
- **API Endpoints**: http://127.0.0.1:8000/api/

## Comandos Útiles

### Desarrollo

```bash
# Limpiar cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Generar nuevas migraciones
php artisan make:migration create_table_name

# Crear controladores
php artisan make:controller NombreController

# Crear modelos
php artisan make:model NombreModelo -m

# Ejecutar tests
php artisan test
```

## Estructura del Proyecto

```
encuestas-app/
├── app/                    # Lógica de aplicación Laravel
├── database/              # Migraciones y seeders
├── public/                # Assets públicos
├── resources/
│   ├── js/               # Componentes React
│   ├── css/              # Estilos
│   └── views/            # Vistas Blade
├── routes/               # Definición de rutas
├── storage/              # Archivos de almacenamiento
└── tests/               # Tests automatizados
```

## Solución de Problemas

### Error de conexión a base de datos
- Verificar que PostgreSQL esté ejecutándose
- Revisar credenciales en `.env`
- Confirmar que la base de datos existe


## Licencia

Este proyecto está bajo la Licencia MIT.
