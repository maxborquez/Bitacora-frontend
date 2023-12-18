# Especificar la imagen base con Ubuntu 20.04
FROM ubuntu:20.04

# Instalar dependencias necesarias
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    libssl-dev

# Descargar Node.js 18.19.0 y descomprimirlo
RUN curl -o node-v18.19.0-linux-x64.tar.xz https://nodejs.org/dist/v18.19.0/node-v18.19.0-linux-x64.tar.xz
RUN mkdir -p /usr/local/lib/nodejs
RUN tar -xJvf node-v18.19.0-linux-x64.tar.xz -C /usr/local/lib/nodejs

# Establecer las variables de entorno para Node.js
ENV NODE_VERSION=v18.19.0
ENV PATH=/usr/local/lib/nodejs/node-v18.19.0-linux-x64/bin:$PATH

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Clonar el repositorio de frontend desde GitHub
RUN git clone https://github.com/maxborquez/Bitacora-frontend.git .
COPY .env /usr/src/app/.env
COPY package.json /usr/src/app/

# Instalar las dependencias de Node.js para tu aplicación
RUN npm install

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 5173

# Comando para iniciar la aplicación en modo desarrollo
CMD ["npm", "run", "dev"]
