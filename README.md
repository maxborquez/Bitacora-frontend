# Bitacora-frontend

# actualizacion del sistema.

```bash
sudo apt-get update
```

# git y curl
Es fundamental instalar git y curl.

```bash
sudo apt-get install git curl
```

# Node version manager
Es fundamental instalar Node Version Manager para ejecutar la aplicacion.

```bash
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash 
```
```bash
source ~/.bashrc   
```
Instalamos la version 18.16.0 de Node
```bash
nvm install 18.16.0 
```

# Instrucciones de instalacion
- Entrar al directorio donde se desea instalar y clonar el repositorio con el comando git clone.
```bash
git clone https://github.com/maxborquez/Bitacora-backend.git
```
- entrar al directorio clonado y ejecutar el comando de instalacion de dependencias.
```bash
npm install
```
- instalar la dependencia pm2 para dejar e proyecto ejecutandose permanentemente
```bash
npm install -g pm2
```
- cambiar el puerto utilizado por el proyecto en el archivo vite.config.js al puerto 80
```bash
nano vite.config.js
```

- Tambien es necesario cambiar la url de acceso al backend.
acceder al directorio helpers
```bash
cd Bitacora-frontend/src/helpers
```
editar el archivo clienteaxios.jsx y agregar la BASE_URL del backend.
ejemplo 
http://146.30.198.89:1152/api/
```bash
nano clienteaxios.jsx
```
- una vez completado volvemos a la raiz del proyecto y podemos ejecutarlo.
```bash
npm run build
```
```bash
pm2 start npm -- run dev
```
- Se podra acceder al frontend desde la URL con la ip y puerto del contenedor
ejemplo:
 ```bash
http://146.30.198.89:1160
``` 

<br>
<br>
<br>

# Docker Run
Con una terminal situarse dentro del directorio raiz donde fue clonado este repositorio.
Una vez situado en la raiz del proyecto y ejecutar lo siguiente para construir la imagen docker:

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
