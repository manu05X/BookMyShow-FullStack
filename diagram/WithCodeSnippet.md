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

3. **Code**:
    ```javascript
    // Register route
    router.post("/register", async (req, res) => {
      try {
        // Check if the user already exists
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
          return res.status(400).send({
            success: false,
            message: "User already exists",
          });
        }

        // Encrypt the user's password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashPassword;

        // Save the new user to the database
        const newUser = new User(req.body);
        await newUser.save();

        res.send({
          success: true,
          message: "User successfully registered",
        });
      } catch (err) {
        console.log(err);
        res.status(500).send({
          success: false,
          message: "Error registering user",
        });
      }
    });
    ```

### 2. **Login Route (`/login`)**

1. **Request**: `POST /login`
   - **Inputs**: `email`, `password`
   
2. **Process**:
   - Find the user by email in MongoDB.
   - Validate the password using `bcrypt`.
   - If validation fails, return a 400 status with an error message.
   - If successful, generate a JWT token.
   - Respond with the token and user data.

3. **Code**:
    ```javascript
    // Login route
    router.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).send({
            success: false,
            message: "User not registered. Please register first.",
          });
        }

        // Validate the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).send({
            success: false,
            message: "Invalid credentials",
          });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });

        res.send({
          success: true,
          message: "User logged in successfully",
          token: token,
          user: user,
        });
      } catch (err) {
        console.log(err);
        res.status(500).send({
          success: false,
          message: "Error logging in user",
          error: err.message,
        });
      }
    });
    ```

### 3. **Get Current User Route (`/get-current-user`)**

1. **Request**: `GET /get-current-user`
   - **Middleware**: `authMiddleware`
   
2. **Process**:
   - Verify the JWT token.
   - Retrieve user data from MongoDB using the user ID from the token.
   - Respond with user data.

3. **Code**:
    ```javascript
    // Get current user route
    router.get("/get-current-user", authMiddleware, async (req, res) => {
      try {
        // Retrieve the user's details except for the password
        const user = await User.findById(req.body.userId).select("-password");

        res.send({
          success: true,
          message: "User authorized for protected route",
          data: user,
        });
      } catch (err) {
        console.log(err);
        res.status(500).send({
          success: false,
          message: "Error retrieving user data",
        });
      }
    });
    ```

### 4. **Auth Middleware**

1. **Process**:
   - Extract JWT token from the `Authorization` header.
   - Verify the token using `jsonwebtoken`.
   - Attach `userId` from the token to `req.body`.
   - Call `next()` to proceed to the next middleware or route handler.

2. **Code**:
    ```javascript
    const jwt = require("jsonwebtoken");

    module.exports = function (req, res, next) {
      try {
        let token = req.headers.authorization.split(" ")[1];
        let verifiedToken = jwt.verify(token, process.env.SECRET_KEY);

        // Attach userId from the token to req.body
        req.body.userId = verifiedToken.userId;

        next();
      } catch (error) {
        res.send({
          success: false,
          message: "Invalid token",
        });
      }
    };
    ```

## Client-Side (Frontend) Context

### 1. **User Registration**

1. **Action**: `RegisterUser` function
   - **Inputs**: User registration data (`value`)
   
2. **Process**:
   - Send a `POST` request to `/api/users/register` with the registration data.
   - Handle success and error responses.

3. **Code**:
    ```javascript
    import { axiosInstance } from "./index";

    export const RegisterUser = async (value) => {
      try {
        const response = await axiosInstance.post("api/users/register", value);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    };
    ```

### 2. **User Login**

1. **Action**: `LoginUser` function
   - **Inputs**: User login data (`value`)
   
2. **Process**:
   - Send a `POST` request to `/api/users/login` with the login data.
   - On success, store the JWT token in local storage and update Redux state with user data.
   - Redirect to the home page.

3. **Code**:
    ```javascript
    export const LoginUser = async (value) => {
      try {
        const response = await axiosInstance.post("api/users/login", value);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    ```

### 3. **Get Current User**

1. **Action**: `getCurrentUser` function
   - **Process**:
     - Send a `GET` request to `/api/users/get-current-user` with the JWT token.
     - Update Redux state with user data.
     - Render protected content based on user data.

2. **Code**:
    ```javascript
    export const getCurrentUser = async () => {
      try {
        const response = await axiosInstance.get("api/users/get-current-user");
        return response.data;
      } catch (error) {
        console.log(error);
      }
    };
    ```

### 4. **Protected Route Component**

1. **Component**: `ProtectedRoute`
   - **Process**:
     - Check if a JWT token is present in local storage.
     - If present, call `getValidUser` to validate the token.
     - If invalid or missing, redirect to the login page.
   
2. **Code**:
    ```javascript
    import { useEffect } from "react";
    import { useDispatch } from "react-redux";
    import { hideLoading, showLoading } from "../redux/loaderSlice";
    import { getCurrentUser } from "../apicalls/users";
    import { useNavigate } from "react-router-dom";

    function ProtectedRoute({ children }) {
      const dispatch = useDispatch();
      const navigate = useNavigate();

      const getValidUser = async () => {
        try {
          dispatch(showLoading());
          const response = await getCurrentUser();
          dispatch(hideLoading());
        } catch (error) {
          console.error(error);
        }
      };

      useEffect(() => {
        if (localStorage.getItem("token")) {
          getValidUser();
        } else {
          navigate("/login");
        }
      }, [navigate]);

      return <div>{children}</div>;
    }

    export default ProtectedRoute;
    ```

### 5. **Redux State Management**

#### User Slice

1. **State**: 
   - `user`: Holds the current user's data.
   
2. **Reducers**:
   - `setUser`: Update the user data in the state.

3. **Code**:
    ```javascript
    import { createSlice } from "@reduxjs/toolkit";

    const userSlice = createSlice({
      name: "user",
      initialState: {
        user: null,
      },
      reducers: {
        setUser: (state, action) => {
          state.user = action.payload;
        },
      },
    });

    export const { setUser } = userSlice.actions;
    export default userSlice.reducer;
    ```

#### Loader Slice

1. **State**: 
   - `loading`: Boolean indicating if data is loading.
   
2. **Reducers**:
   - `showLoading`: Set loading to true.
   - `hideLoading`: Set loading to false.

3. **Code**:
    ```javascript
    import { createSlice } from "@reduxjs/toolkit";

    const loaderSlice = createSlice({
      name: "loader",
      initialState: {
        loading: false,
      },
      reducers: {
        showLoading: (state) => {
          state.loading = true;
        },
        hideLoading: (state) => {
          state.loading = false;
        },
      },
    });

    export const { showLoading, hideLoading } = loaderSlice.actions;
    export default loaderSlice.reducer;
    ```

### 6. **API Calls with Axios**

1. **Configuration**:
   - `Content-Type`: `application/json`
   - `Authorization`: Bearer token from local storage.

2. **Usage**:
   - Used in API calls (`RegisterUser`, `LoginUser`, `getCurrentUser`) to communicate with the backend.

3. **Code**:
    ```javascript
    import axios from "axios";

    export const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });
    ```

## Conclusion

This document provides a detailed overview of the code flow for both server-side and client-side operations. It covers how user authentication, registration, and protected route handling are managed, ensuring a seamless integration between the backend server and the React frontend application.
