# Bitacora-frontend

# Docker Run
Con una terminal situarse dentro del directorio raiz donde fue clonado este repositorio-
Una vez situado en la raiz del proyecto, dirigirse al directorio `docker` y ejecutar lo siguiente para construir la imagen docker:

```bash
docker build -t bitacora_frontend:v1.0 . --no-cache

```

Una vez construida la imagen, lanzar un contenedor

```bash
docker run --rm -it -p 3000:3000/tcp bitacora_frontend:v1.0
```

## Construido con

- [Node.js]
- [Vite]
- [Express]
- [React]
