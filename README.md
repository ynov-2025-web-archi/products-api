# E-commerce API

A RESTful API built with Express.js and Prisma for managing products.

## Features

- CRUD operations for products
- SQLite database with Prisma ORM
- RESTful API design
- Input validation
- Error handling

## Product Schema

Products are stored with the following structure:

```json
{
  "id": 1,
  "name": "Product A",
  "description": "This is a description for Product A.",
  "price": 29.99,
  "category": "Electronics",
  "imageUrl": "https://picsum.photos/id/1011/300/200"
}
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```

3. **Initialize the database:**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start the server:**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:3000`

## API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get product by ID |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Check API status |

## Example Usage

### Get all products
```bash
curl http://localhost:3000/api/products
```

### Create a product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Product A",
    "description": "This is a description for Product A.",
    "price": 29.99,
    "category": "Electronics",
    "imageUrl": "https://picsum.photos/id/1011/300/200"
  }'
```

### Get product by ID
```bash
curl http://localhost:3000/api/products/1
```

### Update a product
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Product A",
    "price": 39.99
  }'
```

### Delete a product
```bash
curl -X DELETE http://localhost:3000/api/products/1
```

## Database Management

- **View database with Prisma Studio:**
  ```bash
  npm run db:studio
  ```

- **Reset database:**
  ```bash
  npx prisma db push --force-reset
  ```

## Scripts

- `npm start` - Start the server
- `npm run dev` - Start the server in development mode with nodemon
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Prisma Studio for database management 