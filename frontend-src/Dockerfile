# Use a Bun-compatible image as the base
FROM oven/bun:alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and bun.lockb files
COPY package.json bun.lockb ./

# Install dependencies using bun
RUN bun install

# Copy the rest of the application code
COPY . .

# Temporarily install node and npm
RUN apk add --no-cache nodejs npm

# Build server
ARG BACKEND_URL="http://127.0.0.1:8000"
RUN BACKEND_URL=$BACKEND_URL npm run build

# Delete node and npm
RUN apk del nodejs npm

# Expose the server port
EXPOSE 3000
CMD bun run serve -s build