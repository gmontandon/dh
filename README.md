# Portal Web David Henderson Grupo

Portal web dinámico para David Henderson Grupo, construido con Node.js y Express.

## Características

- ✅ Frontend modular con header/footer reutilizables
- ✅ Secciones: Inicio, Servicios, Noticias, Contacto
- ✅ Panel público de administración de noticias (agregar/editar/borrar)
- ✅ Formulario de contacto funcional
- ✅ Arquitectura moderna y escalable
- ✅ Almacenamiento en JSON (sin base de datos)

## Tecnologías

- **Backend**: Node.js + Express
- **Motor de plantillas**: EJS
- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **Almacenamiento**: JSON

## Instalación

1. Asegúrate de tener Node.js instalado (versión 14 o superior)
2. Instala las dependencias:

```bash
npm install
```

## Ejecución

Para iniciar el servidor:

```bash
npm start
```

El servidor estará disponible en: `http://localhost:3000`

## Estructura del Proyecto

```
/
├── .github/
│   └── copilot-instructions.md  # Instrucciones del proyecto
├── public/                       # Archivos estáticos
│   ├── css/
│   │   └── styles.css
│   └── js/
│       └── main.js
├── views/                        # Plantillas EJS
│   ├── partials/
│   │   ├── header.ejs           # Header reutilizable
│   │   └── footer.ejs           # Footer reutilizable
│   ├── index.ejs                # Página de inicio
│   ├── servicios.ejs            # Página de servicios
│   ├── noticias.ejs             # Lista de noticias
│   ├── contacto.ejs             # Formulario de contacto
│   └── admin.ejs                # Panel de administración
├── routes/                       # Rutas del backend
│   ├── index.js                 # Rutas principales
│   ├── noticias.js              # API de noticias
│   └── contacto.js              # API de contacto
├── data/                         # Almacenamiento JSON
│   ├── noticias.json
│   └── contactos.json
├── server.js                     # Servidor Express
├── package.json                  # Dependencias
└── README.md                     # Este archivo
```

## Rutas Principales

- `/` - Página de inicio
- `/servicios` - Servicios del grupo
- `/noticias` - Lista de noticias
- `/contacto` - Formulario de contacto
- `/admin` - Panel de administración de noticias

## API Endpoints

- `GET /api/noticias` - Obtener todas las noticias
- `POST /api/noticias` - Crear nueva noticia
- `PUT /api/noticias/:id` - Actualizar noticia
- `DELETE /api/noticias/:id` - Eliminar noticia
- `POST /api/contacto` - Enviar formulario de contacto

## Uso del Panel de Administración

1. Accede a `/admin`
2. Completa el formulario para crear una nueva noticia
3. Las noticias existentes aparecerán en la lista
4. Puedes editar o eliminar cada noticia con los botones correspondientes

## Notas

- Las noticias y contactos se guardan en archivos JSON en la carpeta `data/`
- El panel de administración es público (sin autenticación)
- Los datos persisten entre reinicios del servidor

## Próximos pasos

- Agregar autenticación al panel de administración
- Implementar base de datos (MongoDB, PostgreSQL, etc.)
- Agregar imágenes a las noticias
- Mejorar diseño responsive
- Agregar más secciones según necesidad

## Licencia

ISC - David Henderson Grupo © 2025
