# Base Image
FROM node:alpine

# Woring directory
WORKDIR /usr/app/

# Install dependencies
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm install -g serve

# Build project
RUN npm run build

# Startup command
CMD ["serve", "build"]