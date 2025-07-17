#!/bin/bash

cd "$(dirname "$0")"  # Ensure we're in the script's directory

# Start both servers concurrently
npx concurrently \
  "cd frontend && npm run dev" \
  "cd backend && uvicorn main.main:app --reload"
