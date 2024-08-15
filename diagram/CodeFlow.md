# Project Code Flow

## Overview

This project is a full-stack application that includes a backend server using Express.js and a frontend application built with React. It provides functionality for user authentication, registration, and access to protected routes.

## Server-Side (Backend) Context

### 1. **Registration Route (`/register`)**

1. **Request**: `POST /register`
   - **Inputs**: `email`, `password`
2. **Process**:

   - Check if the user already exists in MongoDB.
   - If the user exists, return a 400 status with an error message.
   - If not, hash the password using `bcrypt`.
   - Save the new user with the hashed password to MongoDB.
   - Respond with a success message.

3. **Response**:
   - Success: `{ success: true, message: "User successfully registered" }`
   - Failure: `{ success: false, message: "Error registering user" }`

### 2. **Login Route (`/login`)**

1. **Request**: `POST /login`
   - **Inputs**: `email`, `password`
2. **Process**:

   - Find the user by email in MongoDB.
   - Validate the password using `bcrypt`.
   - If validation fails, return a 400 status with an error message.
   - If successful, generate a JWT token.
   - Respond with the token and user data.

3. **Response**:
   - Success: `{ success: true, message: "User logged in successfully", token: <JWT_TOKEN>, user: <USER_DATA> }`
   - Failure: `{ success: false, message: "Error logging in user" }`

### 3. **Get Current User Route (`/get-current-user`)**

1. **Request**: `GET /get-current-user`
   - **Middleware**: `authMiddleware`
2. **Process**:

   - Verify the JWT token.
   - Retrieve user data from MongoDB using the user ID from the token.
   - Respond with user data.

3. **Response**:
   - Success: `{ success: true, message: "User authorized for protected route", data: <USER_DATA> }`
   - Failure: `{ success: false, message: "Error retrieving user data" }`

### 4. **Auth Middleware**

1. **Process**:

   - Extract JWT token from the `Authorization` header.
   - Verify the token using `jsonwebtoken`.
   - Attach `userId` from the token to `req.body`.
   - Call `next()` to proceed to the next middleware or route handler.

2. **Response**:
   - On invalid token, respond with `{ success: false, message: "Invalid token" }`.

## Client-Side (Frontend) Context

### 1. **User Registration**

1. **Action**: `RegisterUser` function
   - **Inputs**: User registration data (`value`)
2. **Process**:
   - Send a `POST` request to `/api/users/register` with the registration data.
   - Handle success and error responses.

### 2. **User Login**

1. **Action**: `LoginUser` function
   - **Inputs**: User login data (`value`)
2. **Process**:
   - Send a `POST` request to `/api/users/login` with the login data.
   - On success, store the JWT token in local storage and update Redux state with user data.
   - Redirect to the home page.

### 3. **Get Current User**

1. **Action**: `getCurrentUser` function
   - **Process**:
     - Send a `GET` request to `/api/users/get-current-user` with the JWT token.
     - Update Redux state with user data.
     - Render protected content based on user data.

### 4. **Protected Route Component**

1. **Component**: `ProtectedRoute`
   - **Process**:
     - Check if a JWT token is present in local storage.
     - If present, call `getValidUser` to validate the token.
     - If invalid or missing, redirect to the login page.
2. **Usage**:
   - Wrap protected routes with `ProtectedRoute` to ensure only authenticated users can access them.

### 5. **Redux State Management**

#### User Slice

1. **State**:
   - `user`: Holds the current user's data.
2. **Reducers**:
   - `setUser`: Update the user data in the state.

#### Loader Slice

1. **State**:
   - `loading`: Boolean indicating if data is loading.
2. **Reducers**:
   - `showLoading`: Set loading to true.
   - `hideLoading`: Set loading to false.

### 6. **API Calls with Axios**

1. **Configuration**:

   - `Content-Type`: `application/json`
   - `Authorization`: Bearer token from local storage.

2. **Usage**:
   - Used in API calls (`RegisterUser`, `LoginUser`, `getCurrentUser`) to communicate with the backend.

## Conclusion

This document provides a detailed overview of the code flow for both server-side and client-side operations. It covers how user authentication, registration, and protected route handling are managed, ensuring a seamless integration between the backend server and the React frontend application.
