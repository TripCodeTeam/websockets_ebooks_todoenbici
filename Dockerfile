# Imagen oficial de Node.js 18 (última versión)
FROM node:18

# Directorio de trabajo
WORKDIR /usr/src/app

# Cambie temporalmente al usuario 'root' para instalar pm2
USER root

# Instale PM2 globalmente
RUN npm install -g pm2

# Cambie nuevamente al usuario 'node'
USER node

# Copie los archivos package.json y package-lock.json
COPY --chown=node:node package*.json ./

# Manejo de errores de red e instalacion de dependencias
RUN npm config set fetch-retries 5 \
    && npm config set fetch-retry-mintimeout 20000 \
    && npm config set fetch-retry-maxtimeout 120000 \
    && npm install --verbose

# Copie el resto del código fuente
COPY --chown=node:node . .

# Construi la aplicación NestJS
RUN npm run build

# Expuse el puerto necesario
EXPOSE 3000

# Configure PM2 para ejecutar la aplicación
CMD ["pm2-runtime", "npm", "--", "run", "start:prod"]
