# Base Image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Expose the Vite development server port
EXPOSE 3030

# Start the development server
CMD ["npm", "run", "dev"]
