Aquí tienes una versión lista para agregar a tu archivo `README.md`:

```markdown
# Instrucciones para Ejecutar el Proyecto

## Requisitos previos
- Node.js (v14 o superior)
- npm (viene con Node.js)

## Configuración inicial

1. Instalar dependencias del backend:
```bash
npm install
```

2. Instalar dependencias del frontend:
```bash
cd frontend
npm install
cd ..
```

## Ejecución del proyecto

1. Iniciar el servidor backend (en la raíz del proyecto):
```bash
node src/app.js
```

2. En otra terminal, iniciar el frontend:
```bash
cd frontend
npm run dev
```

## Acceso a la aplicación
- Frontend: Se abrirá automáticamente en `http://localhost:5173`
- Backend: Estará disponible en `http://localhost:3000` (o el puerto configurado)

> **Nota:** Ambos servicios deben estar en ejecución simultáneamente.
```

Puedes copiar y pegar este contenido directamente en tu archivo README.md. He mejorado el formato para que sea más claro y legible, con:
- Secciones bien diferenciadas
- Sintaxis de código correcta para Markdown
- Indicaciones más precisas
- Nota importante destacada
