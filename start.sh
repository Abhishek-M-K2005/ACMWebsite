#!/bin/bash

echo "Starting ACM Website Infrastructure..."

# 1. Boot the Backend
echo "Starting MySQL and Rails Backend..."
cd ACMbackend
docker compose up -d --build

# 2. Boot the Frontend
echo "Starting React Frontend..."
cd ../ACMfrontend

# Kill any existing frontend process to prevent port conflicts
pkill -f "npm run preview" 2>/dev/null

# Start the frontend in the background
nohup npm run preview -- --host 0.0.0.0 > frontend.log 2>&1 &

echo "Success! The ACM website is live."
echo "Backend: Running in Docker (Port 3000)"
echo "Frontend: Running in background (Port 4173) -> Logs in ACMfrontend/frontend.log"