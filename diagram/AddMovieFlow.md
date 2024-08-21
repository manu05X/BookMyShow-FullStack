# Flow of Events: "Add Movie" Button in MERN Stack Application

## 1. User Interaction

- **Event**: User clicks the "Add Movie" button.
- **Effect**: This triggers a state update that sets `setIsModalOpen(true)`.

## 2. Modal Display

- **Condition**: When `isModalOpen` is `true`, the `MovieFormModal` component renders the modal.
- **Effect**: The modal appears on the screen, displaying a form where the user can enter movie details.

## 3. Form Submission

- **Event**: User fills in the movie details and submits the form.
- **Trigger**: The `onFinish` function is triggered with the form values as the `values` argument.

## 4. Form Handling (onFinish)

- **Loading State**: The `showLoading` action is dispatched to indicate that a process is ongoing.
- **API Call**:
  - If `formType` is `"add"`, the `addMovie` API function is called with the form values.
  - If `formType` is `"edit"`, the `updateMovie` API function is called with the updated values and the movie's ID.
- **Response Handling**:
  - If the API response indicates success:
    - The `getData()` function is called to refresh the movie list.
    - A success message is displayed using `message.success`.
    - The modal is closed by setting `setIsModalOpen(false)`.
  - If the API response indicates failure:
    - An error message is displayed using `message.error`.
- **End Process**: The `hideLoading` action is dispatched to stop the loading indicator.

## 5. Backend API (addMovie function)

- **API Function**: `addMovie` sends a `POST` request to the `/api/movies/add-movie` endpoint with the form data (payload).
- **Backend Route Handling**:
  - **Route**: `router.post("/add-movie", async (req, res) => {...})`
  - **Action**:
    - The backend receives the data from `req.body`.
    - A new movie document is created using `new Movie(req.body)`.
    - The new movie is saved to the database using `await newMovie.save()`.
    - A success response is sent back to the client.
  - **Error Handling**:
    - If there's an error during the save operation, an error response is sent back to the client.

## 6. Database Operation

- **Data Insertion**:
  - The movie data is inserted into the MongoDB collection as a new document.
  - The successful save operation triggers a positive response to be returned to the frontend.

## 7. UI Update

- **Success Scenario**:
  - The movie list is refreshed to include the newly added movie.
  - The user is informed of the successful operation via a message.
  - The modal is closed, returning the user to the main interface.
- **Failure Scenario**:
  - The user is informed of the failure, and the modal remains open for further corrections.
