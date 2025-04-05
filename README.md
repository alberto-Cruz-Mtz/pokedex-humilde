---

# Pokedex CRUD

Este proyecto es un ejemplo de una Pokedex que consume la [PokeAPI](https://pokeapi.co/) y permite realizar operaciones básicas de CRUD, tales como:

**buscar** Pokémon.
- **Agregar a favoritos** y **eliminar de favoritos**.
- **Modificar el nombre** de un Pokémon.

El proyecto está dividido en dos partes:

- **Backend API:** Desarrollada con **Express** y **MongoDB**.
- **Frontend:** Desarrollado con **React**.

---

## Requisitos

- [Node.js](https://nodejs.org/) y npm (o yarn)
- Servidor de **MongoDB** (local o remoto)

---

## Estructura del Proyecto

```
proyecto/
  ├── frontend/
  │     └── src/
  │           └── app.jsx
  └── src/  (o carpeta de la API)
        └── server.js
```

---

## Instrucciones de Instalación y Ejecución

### 1. Configuración del Backend (API)

1. **Navegar a la carpeta del backend:**

   ```bash
   cd proyecto/src
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Iniciar el servidor:**

   ```bash
   node src/server.js
   ```

   - El servidor se ejecutará en `http://localhost:3000`

---

### 2. Configuración del Frontend

1. **Navegar a la carpeta del frontend:**

   ```bash
   cd frontend/
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```
   
3. **Iniciar la aplicación:**

   ```bash
   npm run dev
   ```

   - La aplicación se abrirá en el navegador en `http://localhost:5173`.

---
