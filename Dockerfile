# Usa la imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalacion de dependencias node
RUN npm install

# Copia el resto del código fuente
COPY . .

# Construye la aplicación NestJS
RUN npm run build

# Expone el puerto necesario (3000 por defecto en NestJS)
EXPOSE 8080

# Usa el comando estándar de inicio de NestJS
CMD ["npm", "run", "start:prod"]
