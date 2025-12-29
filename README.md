# Retai Smart

Plataforma de retail inteligente que ayuda a los usuarios a optimizar sus compras,
ahorrar dinero y tomar decisiones más sostenibles, analizando productos y alternativas a partir
de datos públicos.

## Tecnologías
- Frontend: Angular (Angular CLI)
- Backend: Node.js (NestJS) 
- Base de datos: PostgreSQL
- APIs públicas: Open Food Facts

## Funcionalidades principales
- Búsqueda y análisis de productos
- Generación de listas de compra optimizadas
- Comparación de productos y alternativas
- Cálculo de ahorro estimado

## Algoritmos
- Optimización de listas de compra (multi-criterio)
- Scoring de sostenibilidad (económico y ambiental)

## Cómo ejecutar el proyecto

## Backend
El backend integra Open Food Facts para obtener información real de productos.
Si un código de barras no existe, la API responde 404 de forma controlada.

### Frontend
```bash
cd frontend
npm install
ng serve