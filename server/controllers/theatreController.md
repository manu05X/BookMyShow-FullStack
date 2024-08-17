# Theatre Controller

## Overview

This controller handles the operations related to managing theatres in the application. It includes functions for adding, updating, fetching, and deleting theatres.

## Functions

### 1. `addThreatre`

- **Description**: Adds a new theatre to the database.
- **API Endpoint**: `POST /api/theatres/add`
- **Request Body**: Theatre details (`name`, `location`, `owner`, etc.)
- **Response**:
  - Success: `{"success": true, "message": "New Threat has been added!"}`
  - Failure: `{"success": false, "message": "<error message>"}`

### 2. `updateThreatre`

- **Description**: Updates the details of an existing theatre.
- **API Endpoint**: `PUT /api/theatres/update`
- **Request Body**: Updated theatre details along with `theatreId`.
- **Response**:
  - Success: `{"success": true, "message": "Threatre has been updated"}`
  - Failure: `{"success": false, "message": "<error message>"}`

### 3. `getAllThreatre`

- **Description**: Retrieves all theatres from the database.
- **API Endpoint**: `GET /api/theatres`
- **Response**:
  - Success: `{"success": true, "message": "All theatres fetched successfully!", "data": "<all theatres>"}`
  - Failure: `{"success": false, "message": "<error message>"}`

### 4. `getAllThreatreByOwner`

- **Description**: Retrieves all theatres owned by a specific owner.
- **API Endpoint**: `POST /api/theatres/owner`
- **Request Body**: Owner ID.
- **Response**:
  - Success: `{"success": true, "message": "All theatres fetched successfully!", "data": "<owner's theatres>"}`
  - Failure: `{"success": false, "message": "<error message>"}`

### 5. `deleteThreatre`

- **Description**: Deletes a specific theatre from the database.
- **API Endpoint**: `DELETE /api/theatres/delete`
- **Request Body**: `theatreId` of the theatre to be deleted.
- **Response**:
  - Success: `{"success": true, "message": "Threatre has been deleted!"}`
  - Failure: `{"success": false, "message": "<error message>"}`

## Usage

- These functions should be imported into the route handlers where they will be associated with specific API endpoints.
- Ensure that proper middleware (e.g., authentication, validation) is used to secure and validate requests.
