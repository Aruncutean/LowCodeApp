# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod
# Stage 2
FROM nginx:alpine
COPY --from=node /app/dist/shell /usr/share/nginx/html
# Expose port 80
EXPOSE 4200