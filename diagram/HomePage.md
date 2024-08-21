# Flow of Populating All Movies in Home Component

## 1. **Setup Search Component**

- **Ant Design Components:**
  - Utilize `Row`, `Col`, and `Input` components from `antd` to create a search bar.
  - The search bar allows users to filter movies, but in this example, it primarily acts as a placeholder.
- **Example:**
  ```javascript
  <Row className="justify-content-center w-100">
    <Col xs={{ span: 24 }} lg={{ span: 12 }}>
      <Input placeholder="Search for Movies" type="text" />
      <br />
      <br />
      <br />
    </Col>
  </Row>
  ```

## 2. **Initialize State to Hold Movie Data**

- **useState Hook:**
  - Create a state variable `movies` to hold the list of movies fetched from the backend.
  - Initially, this state is empty and will be populated after data is fetched.
- **Example:**
  ```javascript
  const [movies, setMovies] = useState([]);
  ```

## 3. **Define the Data Fetching Function**

- **Create getData Function:**
  - Use `useCallback` to define a `getData` function that fetches the movie data from the backend.
  - The `getAllMovies` function is called to fetch all movies, and the response is stored in the `movies` state.
- **Example:**
  ```javascript
  const getData = useCallback(async () => {
    try {
      dispatch(showLoading()); // Show loading indicator
      const response = await getAllMovies(); // Fetch all movies
      if (response.success) {
        setMovies(response.data); // Set fetched data to state
      }
      dispatch(hideLoading()); // Hide loading indicator
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch]);
  ```

## 4. **Trigger Data Fetch on Component Mount**

- **useEffect Hook:**
  - Use `useEffect` to call `getData` when the component first mounts.
  - This ensures that movie data is fetched as soon as the `Home` component renders.
- **Example:**
  ```javascript
  useEffect(() => {
    getData(); // Fetch movie data when component mounts
  }, [getData]);
  ```

## 5. **Render Movie List Using Mapping**

- **Mapping Over Movie Data:**
  - Use the `map` method to iterate over the `movies` array and render each movie's poster and title.
  - Each movie is displayed in a card-like format using the `Row` and `Col` layout from `antd`.
- **Example:**
  ```javascript
  <Row
    className="justify-content-center"
    gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
  >
    {movies &&
      movies.map((movie) => (
        <Col
          className="gutter-row mb-5"
          key={movie._id}
          span={{ xs: 24, sm: 24, md: 12, lg: 10 }}
        >
          <div className="text-center">
            <img
              onClick={() =>
                navigate(
                  `/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
                )
              }
              className="cursor-pointer"
              src={movie.poster}
              alt="Movie Poster"
              width={200}
              height={300}
              style={{ borderRadius: "8px" }}
            />
            <h3
              onClick={() =>
                navigate(
                  `/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
                )
              }
              className="cursor-pointer"
            >
              {movie.title}
            </h3>
          </div>
        </Col>
      ))}
  </Row>
  ```

## 6. **Navigate to Single Movie Page**

- **Handling Navigation:**
  - Use the `useNavigate` hook to navigate to a detailed view of a movie when a user clicks on a movie poster or title.
  - The `navigate` function is called with the movie’s ID and current date as query parameters.
- **Example:**
  ```javascript
  const navigate = useNavigate();
  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}?date=${moment().format("YYYY-MM-DD")}`);
  };
  ```

## 7. **Summary of Flow**

- **Search Component:** Set up the search bar using `antd` components.
- **Initialize State:** Use `useState` to create a state variable for storing movie data.
- **Fetch Data:** Implement the `getData` function to fetch movies from the backend and store them in the state.
- **Use Effect:** Use `useEffect` to ensure the data fetch happens when the component first mounts.
- **Render Movies:** Map over the movie data to render each movie's poster and title, providing a way to navigate to detailed movie views.
- **Navigation:** Use the `useNavigate` hook to enable users to click on a movie to see more details.

This markdown explanation mirrors the structure used for explaining other components, providing a clear and step-by-step breakdown of how movie data is fetched and displayed in the `Home` component.
