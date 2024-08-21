# MERN Stack Project Workflow Guide

## 1. **Model (Backend - Database Interaction)**

- **Purpose**: Models define the structure of the data in your database, usually using a schema. In a MERN stack, MongoDB is commonly used, and Mongoose is the ODM (Object Data Modeling) library that provides a schema-based solution to model your data.
- **Steps**:

  - Create a model file (e.g., `Theatre.js`) in the `models` directory.
  - Define a schema using Mongoose.
  - Export the model so it can be used in other parts of your application.

  ```javascript
  const mongoose = require("mongoose");

  const TheatreSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, default: false },
  });

  const Theatre = mongoose.model("Theatre", TheatreSchema);
  module.exports = Theatre;
  ```

## 2. **Routes (Backend - CRUD API)**

- **Purpose**: Routes define the endpoints for your application, allowing the frontend to interact with the backend through HTTP requests. In the context of a MERN stack, Express.js is used to create these routes.
- **Steps**:

  - Create a route file (e.g., `theatreRoutes.js`) in the `routes` directory.
  - Define routes (GET, POST, PUT, DELETE) for the necessary operations (e.g., fetching theatres, adding a new theatre, updating theatre details, etc.).
  - Connect these routes to corresponding controller functions that interact with the models.

  ```javascript
  const express = require("express");
  const router = express.Router();
  const Theatre = require("../models/Theatre");

  // Get all theatres
  router.get("/get-all-theatres", async (req, res) => {
    try {
      const theatres = await Theatre.find().populate("owner");
      res.status(200).json({ success: true, data: theatres });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  // Add a new theatre
  router.post("/add-theatre", async (req, res) => {
    try {
      const newTheatre = new Theatre(req.body);
      await newTheatre.save();
      res.status(201).json({ success: true, data: newTheatre });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  });

  module.exports = router;
  ```

## 3. **Connect Routes to the Express App (Backend API Setup)**

- **Purpose**: To make the defined routes accessible through the Express app, you need to connect them in your main server file (typically `index.js` or `app.js`).
- **Steps**:

  - Import the route files in your main server file.
  - Use `app.use()` to connect these routes with specific paths.

  ```javascript
  const express = require("express");
  const app = express();
  const theatreRoutes = require("./routes/theatreRoutes");

  app.use(express.json());

  // Use the theatre routes under /api/theatre path
  app.use("/api/theatre", theatreRoutes);

  const PORT = process.env.PORT || 8000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  ```

## 4. **Connect Frontend with Backend (Proxy Setup)**

- **Purpose**: To allow the frontend (React) to communicate with the backend (Express) when both are running on different ports, you set up a proxy in the React development environment.
- **Steps**:

  - Add a `"proxy": "http://localhost:8000"` line in the `package.json` file of your React app. This proxies requests from the frontend to the backend during development.

  ```json
  {
    "name": "frontend",
    "version": "1.0.0",
    "dependencies": {
      // other dependencies
    },
    "scripts": {
      "start": "react-scripts start"
      // other scripts
    },
    "proxy": "http://localhost:8000"
  }
  ```

## 5. **API Module (Frontend - API Calls)**

- **Purpose**: To manage the API calls from the frontend, you create a module that encapsulates these calls, making it easy to interact with the backend.
- **Steps**:

  - Create a file (e.g., `theatres.js`) in a `apicalls` or `services` directory in your React project.
  - Use `axios` (or `fetch`) to define functions that make HTTP requests to the backend.

  ```javascript
  import axios from "axios";

  export const getAllThreatresForAdmin = async () => {
    try {
      const response = await axios.get("/api/theatre/get-all-theatres");
      return response.data;
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    }
  };
  ```

## 6. **Using API Calls in React Components**

- **Purpose**: To fetch data or perform actions in response to user interactions (e.g., button clicks), you use the API functions in your React components.
- **Steps**:

  - Import the API functions in your React component.
  - Use `useEffect` to fetch data on component mount or call the API functions in event handlers like `onClick`.

  ```javascript
  import React, { useEffect, useState } from "react";
  import { Table, message, Button } from "antd";
  import { getAllThreatresForAdmin } from "../../apicalls/theatres";

  const TheatresTable = () => {
    const [theatres, setTheatres] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const response = await getAllThreatresForAdmin();
        if (response.success) {
          setTheatres(response.data);
        } else {
          message.error(response.message);
        }
      };
      fetchData();
    }, []);

    return <Table dataSource={theatres} columns={columns} />;
  };

  export default TheatresTable;
  ```

## Summary:

- **Model**: Defines how data is structured in the database.
- **Routes**: Provides endpoints for CRUD operations, interacting with the database through models.
- **App Setup**: Connects routes to the Express app, making them accessible.
- **Proxy**: Ensures frontend and backend can communicate during development.
- **API Module**: Centralizes API calls, making them reusable and maintainable.
- **React Components**: Use API calls to interact with the backend and render data.
