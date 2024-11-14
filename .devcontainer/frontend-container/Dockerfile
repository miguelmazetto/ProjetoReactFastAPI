# Use a Bun-compatible image as the base
FROM imbios/bun-node:latest-22-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and bun.lockb files
COPY package.json bun.lockb ./

# Install dependencies using bun
RUN bun install

# Copy the rest of the application code
COPY . .

# Expose the development server port
EXPOSE 3000