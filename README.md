# Retail Smart

Plataforma de retail inteligente que ayuda a los usuarios a optimizar sus compras,
ahorrar dinero y tomar decisiones más sostenibles, analizando productos a partir de datos públicos.

## Tecnologías

Frontend: Angular (standalone, Angular CLI)

Backend: Node.js (NestJS)

APIs públicas: Open Food Facts

Base de datos: (no requerida para esta prueba)

## Funcionalidades principales

Búsqueda y análisis de productos por código de barras

Visualización de información nutricional y sostenibilidad

Generación de listas de compra optimizadas según presupuesto

Cálculo de totales y promedio de sostenibilidad

### Bonus Frontend

- Indicador visual de calidad nutricional usando `ecoscore` y `novaGroup` (🌱 / ⚠️).
- Persistencia de la lista de compra en `localStorage` para evitar pérdida de datos al refrescar.
- Ordenamiento de productos optimizados por puntaje de sostenibilidad.

## Algoritmos

Optimización de listas de compra (multi-criterio)
Se utiliza un enfoque greedy que selecciona productos sin exceder el presupuesto disponible.

Scoring de sostenibilidad
Cada producto recibe un puntaje de sostenibilidad (0–100) que permite priorizar opciones más responsables.

## Backend

El backend integra la API pública Open Food Facts para obtener información real de productos.

Si un código de barras no existe, la API responde con 404 de forma controlada.

El endpoint de optimización recibe una lista de productos y un presupuesto, y devuelve la selección óptima.

## Endpoints disponibles

GET /products/barcode/:barcode
POST /products/optimize

## Cómo correr el proyecto localmente

Requisitos:

Node.js 18+
NPM
Angular CLI
NestJS CLI

## Backend
cd backend
npm install
npm run start:dev


Backend disponible en:
http://localhost:3000

## Frontend
cd frontend
npm install
ng serve


Frontend disponible en:
http://localhost:4200

## Dataset de ejemplo

Para facilitar las pruebas del optimizador, se incluye un dataset de ejemplo:

Frontend:
frontend/src/assets/datasets/optimize-sample.json

Backend (referencial):
backend/data/sample-products.json

Desde la interfaz, el usuario puede cargar el dataset usando el botón “Cargar ejemplo”.

## Uso de Inteligencia Artificial

Durante el desarrollo se utilizó IA como asistente para:

Definir la estructura del proyecto
Resolver errores de configuración y tipado


## Docker (bonus)

El proyecto puede ejecutarse utilizando Docker Compose para levantar frontend y backend juntos.

Requisitos:
- Docker Desktop
- Docker Compose
- WSL2 habilitado (Windows)

docker compose up --build

## Abrir la app

Frontend: http://localhost:4200

Backend: http://localhost:3000

3) Endpoints (backend)

GET http://localhost:3000/products/barcode/:barcode

POST http://localhost:3000/products/optimize

## Levantar con Docker (Frontend + Backend)

Requisitos:
- Docker Desktop (con WSL2 habilitado en Windows)
- Docker Compose

### Levantar todo
Desde la raíz del repo (donde está `docker-compose.yml`):

docker compose up --build

## Bajar contenedores 

docker compose down

## Ver logs

docker compose logs -f

## Notas finales

Este proyecto fue desarrollado como prueba técnica, priorizando:

Claridad del código

Correcta separación frontend / backend

Funcionalidad end-to-end

Buenas prácticas modernas de desarrollo
