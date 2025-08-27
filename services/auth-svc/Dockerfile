FROM node:16 AS builder

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Production image
FROM node:16 AS production

# Set the working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./

# Install only production dependencies
RUN npm install --legacy-peer-deps

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main.js"]