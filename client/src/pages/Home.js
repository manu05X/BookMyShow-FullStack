import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Input } from "antd";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllMovies } from "../apicalls/movies";
import moment from "moment";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // used to navigate to the perticular movie page using the id on whose poster or name we click

  // to save the data we need state at first time it empty after fetching from api in getData() we set state of movie from the response data.
  const [movies, setMovies] = useState([]);

  /*
  const getData = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllMovies(); // api call to get all movies from the database
      console.log(response.data);

      if (response.success) {
        setMovies(response.data);
      }

      dispatch(hideLoading());
    } catch (error) {
      console.log(error.message);
    }
  };
*/
  const getData = useCallback(async () => {
    try {
      dispatch(showLoading());
      const response = await getAllMovies();
      console.log(response.data);
      if (response.success) {
        //saving data in movie state for using it in our cards list
        setMovies(response.data);
      }
      dispatch(hideLoading());
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch]);

  // useEffect(() => {
  //   getData(); //
  // }, []);

  useEffect(() => {
    getData();
  }, [getData]);
  /*
This is the most straightforward way. By adding getData to the dependency array, you ensure that the effect will rerun if getData changes.
However, if getData doesn't change, this won't cause any unnecessary re-renders or fetch calls.
*/

  // console.log(movies); // All the movies that we have fetched from the database

  return (
    <>
      <Row className="justify-content-center w-100">
        <Col xs={{ span: 24 }} lg={{ span: 12 }}>
          <Input placeholder="Search for Movies" type="text"></Input>
          <br />
          <br />
          <br />
        </Col>
      </Row>

      {/* <Row>
      {Basic working of map -> } 
        {movies.map(for each movie{can be any var})=> {
            we need a <list item  that will show>{movie.title}</list> and this list will be rendered
        {movies.map((movie) => {
          return <li>{movie.title}</li>;
        })}
      </Row> */}

      <Row>
        <Row
          className="justify-content-center"
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          {/* here i am mapping every movie(var/key) and for each and every movie(var/key) i am returning a div i.e its value is 
        returned in div  <div className="text-center"> inside div i have a img and a h3 */}
          {movies &&
            movies.map((movie) => (
              <Col
                className="gutter-row mb-5"
                key={movie._id}
                span={{
                  xs: 24,
                  sm: 24,
                  md: 12,
                  lg: 10,
                }}
              >
                <div className="text-center">
                  <img
                    onClick={() => {
                      //the navigate function will navigate the page to the perticular movie page using the id of that movie whose poster or name we click
                      // it will navigate to the the route /movie/{id}/data/{name} -> /movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`
                      navigate(
                        `/movie/${movie._id}?date=${moment().format(
                          "YYYY-MM-DD"
                        )}`
                      );
                    }}
                    className="cursor-pointer"
                    src={movie.poster}
                    alt="Movie Poster"
                    width={200}
                    height={300}
                    style={{ borderRadius: "8px" }}
                  />
                  <h3
                    onClick={() => {
                      navigate(
                        `/movie/${movie._id}?date=${moment().format(
                          "YYYY-MM-DD"
                        )}`
                      );
                    }}
                    className="cursor-pointer"
                  >
                    {movie.title}
                  </h3>
                </div>
              </Col>
            ))}
        </Row>
      </Row>
    </>
  );
}

export default Home;

/*
1> Search component using row ,col and Input of antd
2> Create the Card where we can fetch the movies 
    a> create the function that will get the movies data

*/

/*
The useEffect hook in React is used to perform side effects in function components, such as data fetching, directly interacting with the DOM, setting up subscriptions, or running any side effect logic. The syntax useEffect(() => { ... }, []) has a specific purpose:

Explanation of useEffect(() => { getData(); }, []);
  useEffect(() => { ... }); :=> This hook takes two arguments: a function and a dependency array. The function is executed after every render by default.
  
  
getData();:=> The function getData is called inside the useEffect hook. This function is responsible for fetching movie data from the backend API when the component is rendered.

[] (Dependency Array):=> The empty array as the second argument means that the effect will only run once, when the component is first mounted (i.e., when the component is first added to the DOM).
      If the dependency array is empty, the effect will not run on subsequent re-renders, unless explicitly triggered by other changes in the component's state or props.


Purpose of Using useEffect(() => { getData(); }, []);
Data Fetching on Component Mount:=> In this context, useEffect is used to ensure that the getData function (which fetches movie data) is executed only once when the Home component is first rendered. This makes sure that the movie data is fetched from the backend API and displayed on the user's screen when they visit the page.
Avoiding Multiple Fetch Calls:=>By passing an empty array as the second argument, you're ensuring that getData is not called on every re-render, which can happen frequently in React. This prevents unnecessary network requests and ensures optimal performance.

Summary
In summary, useEffect(() => { getData(); }, []); is used to:
    Fetch movie data from the backend when the Home component is first rendered.
    Ensure that this data fetching happens only once during the component's lifecycle, avoiding repeated fetch calls on every render.

*/
