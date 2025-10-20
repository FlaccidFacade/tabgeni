FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Build Next.js app
RUN npm run build

# Expose ports
EXPOSE 3000 3001

# Start both Next.js and Express server
CMD ["sh", "-c", "npm run server & npm start"]
