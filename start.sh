#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Starting ACM Website Infrastructure..."

# 1. Boot the Backend
echo "Starting MySQL and Rails Backend..."
cd "$DIR/ACMbackend" || exit 1
if command -v docker &> /dev/null && docker info &> /dev/null; then
    docker compose up -d
else
    echo "⚠️ Docker is not running or not accessible. Make sure Docker Desktop is open, or run Rails locally with: cd ACMbackend && bundle exec rails s"
fi

# 2. Boot the Frontend
echo "Starting React Frontend..."
cd "$DIR/ACMfrontend" || exit 1

# Kill any existing frontend process to prevent port conflicts
pkill -f "npm run preview" 2>/dev/null
FRONTEND_PID=$(lsof -t -i:4173 2>/dev/null)
if [ -n "$FRONTEND_PID" ]; then
    kill -9 "$FRONTEND_PID" 2>/dev/null
fi

# Build the latest frontend bundle
echo "Building frontend production bundle..."
npm run build

# Start the frontend in the background
nohup npm run preview -- --host 0.0.0.0 > frontend.log 2>&1 &

echo "Success! The ACM website is live."
echo "Backend: Port 3000"
echo "Frontend: Running in background (Port 4173) -> Logs in ACMfrontend/frontend.log"
