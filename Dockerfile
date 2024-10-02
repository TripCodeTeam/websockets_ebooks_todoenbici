# Usa la imagen oficial de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos package.json y package-lock.json (si existe)
COPY package*.json ./

# Configura npm para manejar errores de red e instala dependencias
# RUN npm config set fetch-retries 5 \
#     && npm config set fetch-retry-mintimeout 20000 \
#     && npm config set fetch-retry-maxtimeout 120000 \
#     && npm install --verbose

# Copia el resto del código fuente
COPY . .

# Construye la aplicación NestJS
RUN npm run build

# Expone el puerto necesario (3000 por defecto en NestJS)
EXPOSE 3000

# Usa el comando estándar de inicio de NestJS
CMD ["npm", "run", "start:prod"]
