# Usa la imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala el CLI de NestJS globalmente
RUN npm install -g @nestjs/cli

# Instala las dependencias
RUN npm install --production

# Copia todo el código de la aplicación
COPY . .

# Construye la aplicación NestJS
RUN npm run build

# Expone el puerto que usará la aplicación
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
