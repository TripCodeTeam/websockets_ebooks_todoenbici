# Usa una imagen oficial de Node.js como base (versión 18)
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala solo las dependencias de producción
# RUN npm ci --only=production

# Copia el resto de la aplicación al directorio de trabajo
COPY . .

# Construye la aplicación NestJS
RUN npm run build

# Usa una imagen ligera para la etapa de producción
FROM node:18-alpine AS production

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia las dependencias instaladas desde la etapa de construcción
COPY --from=build /usr/src/app/node_modules ./node_modules

# Copia el código construido desde la etapa de construcción
COPY --from=build /usr/src/app/dist ./dist

# Establece las variables de entorno necesarias para la aplicación
ENV NODE_ENV=production
ENV PORT=8080

# Expone el puerto 8080 para Google Cloud Run
EXPOSE 8080

# Comando para ejecutar la aplicación en producción
CMD ["node", "dist/main"]
