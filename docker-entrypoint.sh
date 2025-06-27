#!/bin/sh
set -e

echo "📤 Running Prisma db push..."
npm run db:push

echo "🌱 Seeding database..."
npm run db:seed

echo "🚀 Starting server..."
exec node src/server.js
