# Start from a base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./
COPY ./server/package*.json ./server/

# Install dependencies
RUN npm install

# Navigate to server and install dependencies there too
WORKDIR /app/server
RUN npm install

# Navigate back to app directory
WORKDIR /app

# Copy all files
COPY . .

# Build the project
RUN npm run build

# Start the project
CMD [ "npm", "start" ]
