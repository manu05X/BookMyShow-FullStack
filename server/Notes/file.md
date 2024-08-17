# Node.js Application Structure

## 1. Controllers

### User Controller (`controllers/userController.js`)

- **Purpose**: Controllers handle the logic for specific routes, such as processing user input and interacting with the database.
- **Functions**:
  - **`registerUser`**:
    - **Description**: Registers a new user by checking if the user already exists, hashing the password, and saving the new user to the database.
  - **`loginUser`**:
    - **Description**: Handles user login by verifying the user’s credentials and generating a JWT token.
  - **`getCurrentUser`**:
    - **Description**: Retrieves the currently authenticated user’s details, excluding the password.

## 2. Routes

### User Routes (`routes/userRoutes.js`)

- **Purpose**: Routes define the endpoints of your API and map them to corresponding controller functions.
- **APIs**:
  - **POST** `/api/users/register`:
    - **Controller Function**: `registerUser`
    - **Description**: Registers a new user.
  - **POST** `/api/users/login`:
    - **Controller Function**: `loginUser`
    - **Description**: Logs in a user.
  - **GET** `/api/users/get-current-user`:
    - **Controller Function**: `getCurrentUser`
    - **Middleware**: `authMiddleware`
    - **Description**: Retrieves current user details.

## 3. Middleware

### Auth Middleware (`middleware/authMiddleware.js`)

- **Purpose**: Middleware functions process requests before they reach the controllers. They are often used for tasks like authentication and logging.
- **Function**:
  - **`authMiddleware`**:
    - **Description**: Verifies the JWT token from the request headers. If the token is valid, the request proceeds; if not, an error message is sent.

## 4. Database

### Database Connection (`config/db.js`)

- **Purpose**: The database connection file establishes a connection to MongoDB.
- **Function**:
  - **`connectDB`**:
    - **Description**: Connects to MongoDB using Mongoose and handles connection errors.

## 5. Main Application (`index.js`)

- **Purpose**: This is the entry point of your Node.js application, setting up middleware, routes, and starting the server.
- **Details**:
  - **Middleware**: Uses `express.json()` and `express.urlencoded()` for parsing request bodies.
  - **Routes**: Sets up `/api/users` routes.
  - **Server Initialization**:
    - **Description**: Starts the server on the specified port and listens for incoming requests.
