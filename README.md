# BACKEND TECHNICAL TEST BRI LIFE

## Author: Adjis Ramadhani Utomo

## Project Setup Guide

This is a guide to install this code.

### 1. Clone the Repository

```sh
git clone https://github.com/adjisdhani/test-adjis-bri-life.git
```

### 2. Navigate into the Project Directory

```sh
cd test-adjis-bri-life
```

### 3. Install Dependencies

```sh
npm install
```

### 4. Siapkan Database

```sh
Adjust the database name that is in the .env.sample file
```

### 5. Run the Migration

```sh
npx prisma migrate dev
```

## API Testing using Postman

To test the API, use Postman and set the Token header to a valid token from the database.

# User API Spec

## Register User API

Endpoint : POST api/users

Request Body :

```json
{
  "username": "test",
  "password": "test",
  "name": "test"
}
```

Response Body Success :

```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "test",
    "name": "test",
    "file": null
  },
  "message": "User registered successfully"
}
```

Response Body Error :

```json
{
  "success": false,
  "message": "Username already exists"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :

```json
{
  "username": "test",
  "password": "test"
}
```

Response Body Success :

```json
{
  "success": true,
  "data": {
    "token": "fcf2228f-e0ce-45e7-b297-064e68acab81" /* generate random string from uuid */
  },
  "message": "User logged in successfully"
}
```

Response Body Error :

```json
{
  "success": false,
  "message": "Username or password wrong"
}
```

## Upload File in User API

Endpoint : POST /api/users/uploads

Headers :

- Token : token

Request Body :

```multipart/form-data
{
  "file": "file"
}
```

Response Body Success :

```json
{
  "success": true,
  "data": {
    "username": "test"
  },
  "message": "File Uploaded successfully"
}
```

Response Body Error :

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

## Update User API

Endpoint : PATCH /api/users/self

Headers :

- Token : token

Request Body :

```json
{
  "name": "testt"
}
```

Response Body Success :

```json
{
  "success": true,
  "data": {
    "username": "test",
    "name": "testt",
    "id": 1
  },
  "message": "User updated successfully"
}
```

Response Body Error :

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

## Get User API

Endpoint : GET /api/users/self

Headers :

- Token : token

Response Body Success:

```json
{
  "success": true,
  "data": {
    "username": "test",
    "name": "testt",
    "id": 1
  },
  "message": "User fetched successfully"
}
```

Response Body Error :

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

## Delete User API

Endpoint : DELETE /api/users/:id

Headers :

- Token : token

Response Body Success :

```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

Response Body Error :

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers :

- Token : token

Response Body Success :

```json
{
  "success": true,
  "message": "User logged out successfully"
}
```

Response Body Error :

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

# Product API Spec

## Create Product API

Endpoint : POST api/products

Headers :

- Token : token

Request Body :

```json
{
  "product_name": "test"
}
```

Response Body Success :

```json
{
  "success": true,
  "data": {
    "id": 1,
    "product_name": "test",
    "file": null
  },
  "message": "Product created successfully"
}
```

Response Body Error :

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

## Get Product API

Endpoint : GET /api/products/:productId

Response Body Success :

```json
{
  "success": true,
  "data": {
    "id": 1,
    "product_name": "test",
    "file": null
  },
  "message": "Product fetched successfully"
}
```

Response Body Error :

```json
{
  "success": false,
  "message": "product is not found"
}
```

## Get Product ALL API

Endpoint : GET /api/products

Response Body Success :

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "product_name": "test",
      "file": null,
      "user_id": 1,
      "created_by": 1,
      "updated_by": null,
      "created_at": "2025-12-12T13:55:23.000Z",
      "updated_at": "2025-12-12T13:55:23.000Z",
      "status_code": 1
    },
    {
      "id": 2,
      "product_name": "testt",
      "file": null,
      "user_id": 1,
      "created_by": 1,
      "updated_by": 1,
      "created_at": "2025-12-12T13:56:05.000Z",
      "updated_at": "2025-12-12T14:19:09.000Z",
      "status_code": 0
    }
  ],
  "paging": {
    "page": 1,
    "total_item": 2,
    "total_page": 1
  },
  "message": "Product fetched successfully"
}
```

Response Body Error :

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

## Upload File in Product API

Endpoint : POST /api/products/uploads

Headers :

- Token : token

Request Body :

```multipart/form-data
{
  "file": "file"
}
```

Response Body Success :

```json
{
  "success": true,
  "data": {
    "username": "test"
  },
  "message": "File Uploaded successfully"
}
```

Response Body Error :

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

## Update Product API

Endpoint : PUT /api/products/:productId

Headers :

- Token : token

Request Body :

```json
{
  "product_name": "testttt"
}
```

Response Body Success :

```json
{
  "success": true,
  "data": {
    "id": 2,
    "product_name": "testttt",
    "file": null
  },
  "message": "Product updated successfully"
}
```

Response Body Error :

```json
{
  "success": false,
  "message": "product is not found"
}
```

## Delete Product API

Endpoint : DELETE /api/products/:productId

Headers :

- Token : token

Response Body Success :

```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

Response Body Error :

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

## Conclusion

This API was created as an assessment tool for the BRI LIFE backend technical test. Ensure that every request includes the `Token` header to authorize the action.

---

**Happy coding! 🚀**
