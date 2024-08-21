# Flow of Populating a Single Movie in SingleMovie Component

## 1. **Extract Movie ID from URL**

- **useParams Hook:**
  - The `useParams` hook is used to extract the movie ID from the URL.
  - The extracted ID (`params.id`) is used to fetch the specific movie data.
- **Example:**
  ```javascript
  const params = useParams(); // Extracts the ID from the URL
  ```

## 2. **Initialize State to Hold Movie Data**

- **useState Hook:**
  - Create a state variable `movie` to hold the movie data fetched from the backend.
  - Initially, this state is an empty array but will be populated after data is fetched.
- **Example:**
  ```javascript
  const [movie, setMovie] = useState([]); // State to hold movie data
  ```

## 3. **Define the Data Fetching Function**

- **Create getData Function:**
  - Use `useCallback` to define a `getData` function that fetches the specific movie data from the backend.
  - The `getMovieById` function is called with the movie ID (`params.id`) to fetch the corresponding movie data.
- **Example:**
  ```javascript
  const getData = useCallback(async () => {
    try {
      dispatch(showLoading()); // Show loading indicator
      const movieId = params.id; // Get movie ID from URL
      const response = await getMovieById(movieId); // Fetch movie data using ID
      setMovie(response.data); // Set fetched data to state
      dispatch(hideLoading()); // Hide loading indicator
    } catch (error) {
      dispatch(hideLoading()); // Hide loading on error
      console.error(error);
    }
  }, [dispatch, params.id]);
  ```

## 4. **Trigger Data Fetch on Component Mount**

- **useEffect Hook:**
  - Use `useEffect` to call `getData` when the component first mounts or when the movie ID changes.
  - This ensures that movie data is fetched as soon as the `SingleMovie` component renders.
- **Example:**
  ```javascript
  useEffect(() => {
    getData(); // Fetch movie data when component mounts
  }, [getData]);
  ```

## 5. **Render Movie Details**

- **Conditional Rendering:**
  - Check if `movie` data is available and then render the movie details.
  - Display the movie's poster, title, language, genre, release date, and duration.
- **Example:**
  ```javascript
  return (
    <div className="inner-container">
      {movie && (
        <div className="d-flex single-movie-div">
          <div className="flex-shrink-0 me-3 single-movie-img">
            <img src={movie.poster} width={150} alt="Movie Poster" />
          </div>
          <div className="w-100">
            <h1 className="mt-0">{movie.title}</h1>
            <p className="movie-data">
              Language: <span>{movie.language}</span>
            </p>
            <p className="movie-data">
              Genre: <span>{movie.genre}</span>
            </p>
            <p className="movie-data">
              Release Date:{" "}
              <span>{moment(movie.date).format("MMM Do YYYY")}</span>
            </p>
            <p className="movie-data">
              Duration: <span>{movie.duration} Minutes</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
  ```

## 6. **Summary of Flow**

- **Extract Movie ID:** Use the `useParams` hook to extract the movie ID from the URL.
- **Initialize State:** Use `useState` to create a state variable for storing the movie data.
- **Fetch Data:** Implement the `getData` function to fetch the specific movie data from the backend using the extracted ID.
- **Use Effect:** Use `useEffect` to ensure the data fetch happens when the component first mounts or when the movie ID changes.
- **Render Movie:** Conditionally render the movie details if the data is available, ensuring a smooth user experience.

This explanation follows the same structure used for other components, providing a clear and detailed breakdown of how the movie data is fetched and displayed in the `SingleMovie` component.
