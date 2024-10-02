# Usa la imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install --production

# Copia todo el código de la aplicación
COPY . .

# Construye la aplicación NestJS
RUN npm run build

# Establece la variable de entorno para el puerto
ENV PORT=8080

# Expone el puerto que usará la aplicación
EXPOSE 8080

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
