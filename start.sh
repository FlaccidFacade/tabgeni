#!/bin/bash

# TabGeni Startup Script

echo "🎵 Starting TabGeni..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
  echo "Creating .env file from .env.example..."
  cp .env.example .env
  echo "⚠️  Please edit .env with your configuration (especially AUDD_API_KEY)"
  echo ""
fi

# Check if node_modules exists
if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
  echo ""
fi

# Build the Next.js app if .next doesn't exist
if [ ! -d .next ]; then
  echo "Building Next.js application..."
  npm run build
  echo ""
fi

# Start MongoDB check (optional)
echo "Checking MongoDB connection..."
echo "If MongoDB is not running, use: docker-compose up -d mongodb"
echo ""

# Start the services
echo "Starting services..."
echo "- Backend API: http://localhost:3001"
echo "- Frontend: http://localhost:3000"
echo ""

# Run backend and frontend in parallel
npm run server &
SERVER_PID=$!

npm run dev &
FRONTEND_PID=$!

# Trap to kill both processes on exit
trap "kill $SERVER_PID $FRONTEND_PID 2>/dev/null" EXIT

# Wait for processes
wait
