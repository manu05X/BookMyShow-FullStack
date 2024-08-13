/*
a api(router.get('/get-current-user')) from backend will verify if current user is a valid user or not by using the stored token/credentials on browser
*/

/*
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // before seting the user we check if the user is valid user or not
  //our frontend need to make a api call

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getValidUser = async () => {
    try {
      dispatch(showLoading);
      const response = await getCurrentUser();
      //console.log(response);
      dispatch(hideLoading);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    //if token is present in localStorage then run getValidUser
    if (localStorage.getItem("token")) {
      console.log(localStorage.getItem("token"));
      getValidUser();
    } else {
      // navigation this user to login page if validation fails
      navigate("/login");
    }
  });

  return <div>{children}</div>;
}

export default ProtectedRoute;
*/

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

      if (!response.success) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      dispatch(hideLoading());
      localStorage.removeItem("token");
      navigate("/login");
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
