# Use an official Python image as a parent image
FROM python:3.13-alpine

# Set the working directory
WORKDIR /workspace

# Install required packages
RUN apk add --no-cache \
    libpq-dev postgresql-client curl gcc musl-dev

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN apk --purge del gcc musl-dev

# Copy the application code
COPY . .

# Expose port 8000 for the FastAPI server
EXPOSE 8000
CMD ["fastapi", "run", "main.py", "--port", "8000"]