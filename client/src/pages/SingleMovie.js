import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getMovieById } from "../apicalls/movies";
import moment from "moment";

const SingleMovie = () => {
  const params = useParams();
  //   const movieId = params.id;
  const dispatch = useDispatch();
  //console.log(movieId);
  // to save the data we need state at first time it empty after fetching from api in getData() we set state of movie from the response data.
  const [movie, setMovie] = useState([]);

  const getData = useCallback(async () => {
    try {
      dispatch(showLoading());
      const movieId = params.id; // getting the movie id from the url using useParams
      // console.log(movieId);
      const response = await getMovieById(movieId); // passing the movieId that we extracted from the URL

      //console.log(response);

      setMovie(response.data);

      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  //console.log(movie);

  return (
    <>
      <div className="inner-container">
        {movie && (
          <div className="d-flex single-movie-div">
            <div className="flex-Shrink-0 me-3 single-movie-img">
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
    </>
  );
};

export default SingleMovie;

/*

1> useParams is use to access id data from url i.e here we take out the id of movie from the URL and show it on the page
2> Create a getData method to get perticular movie data from the id we extracted from url and send it to the backend api using 
    the function getMovieById(params.id);
3> With help of useState we save the data we need in State. At first time it empty after fetching from api in getData() we set state of movie from the response data.
  const [movies, setMovies] = useState([]); then  we setMovies(response.data); from the response we get from the backend api call


*/
