import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getMovieById } from "../apicalls/movies";
import moment from "moment";
import { Input, message, Row, Col, Divider } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import { getAllTheatresByMovie } from "../apicalls/shows";

const SingleMovie = () => {
  const params = useParams();
  //   const movieId = params.id;
  const dispatch = useDispatch();
  //console.log(movieId);
  // to save the data we need state at first time it empty after fetching from api in getData() we set state of movie from the response data.
  const [movie, setMovie] = useState([]);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD")); // set state of date and by default it chooses current date
  const [theatres, setTheatres] = useState([]);
  const navigate = useNavigate();

  //Function handle date events
  const handleDate = (e) => {
    setDate(moment(e.target.value).format("YYYY-MM-DD"));
    navigator(`/movie/${params.id}?date=${e.target.value}`);
  };

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

  //getting all the movies wrt to movie id and date for a specific theatre
  const getAllTheatres = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllTheatresByMovie({ movie: params.id, date });
      if (response.success) {
        setTheatres(response.data);
        console.log(theatres);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.err(err.message);
    }
  };

  useEffect(() => {
    getData();
  }, [getData]);

  //console.log(movie);
  useEffect(() => {
    getAllTheatres();
  }, [date]);

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
              <hr />
              <div className="d-flex flex-column-mob align-items-center mt-3">
                <label className="me-3 flex-shrink-0">Choose the date: </label>
                <Input
                  onChange={handleDate}
                  type="date"
                  min={moment().format("YYYY-MM-DD")}
                  className="max-width-300 mt-8px-mob"
                  value={date}
                  placeholder="default size"
                  prefix={<CalendarOutlined />}
                />
              </div>
            </div>
          </div>
        )}
        {/* If the theatres is empty then their is no Show available for the current movie  */}
        {theatres.length === 0 && (
          <div className="pt-3">
            <h2 className="blue-clr">
              currently, No theatres Available for this movie!
            </h2>
          </div>
        )}
        {theatres.length > 0 && (
          <div className="theatre-wrapper mt-3 pt-3">
            <h2>Theatres</h2>
            {theatres.map((theatre) => {
              return (
                <div key={theatre._id}>
                  <Row gutter={24} key={theatre._id}>
                    <Col xs={{ span: 24 }} lg={{ span: 8 }}>
                      <h3>{theatre.name}</h3>
                      <p>{theatre.address}</p>
                    </Col>
                    <Col xs={{ span: 24 }} lg={{ span: 16 }}>
                      <ul className="show-ul">
                        {theatre.shows
                          .sort(
                            (a, b) =>
                              moment(a.time, "HH:mm") - moment(b.time, "HH:mm")
                          )
                          .map((singleShow) => {
                            return (
                              <li
                                key={singleShow._id}
                                onClick={() =>
                                  navigate(`/book-show/${singleShow._id}`)
                                }
                              >
                                {moment(singleShow.time, "HH:mm").format(
                                  "hh:mm A"
                                )}
                              </li>
                            );
                          })}
                      </ul>
                    </Col>
                  </Row>
                  <Divider />
                </div>
              );
            })}
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
