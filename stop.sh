#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "Stopping ACM Website Infrastructure..."

# 1. Stop the Frontend
echo "Stopping React Frontend..."
pkill -f "npm run preview" 2>/dev/null

# Free up port 4173 if any orphan node processes are lingering
FRONTEND_PID=$(lsof -t -i:4173 2>/dev/null)
if [ ! -z "$FRONTEND_PID" ]; then
    echo "Killing lingering frontend process (PID: $FRONTEND_PID)..."
    kill -9 $FRONTEND_PID 2>/dev/null
fi

# 2. Stop the Backend
echo "Stopping MySQL and Rails Backend (Docker)..."
cd "$DIR/ACMbackend" || exit 1
if command -v docker &> /dev/null && docker info &> /dev/null; then
    docker compose down
fi

echo "All ACM services have been stopped successfully."

