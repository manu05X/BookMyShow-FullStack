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

import React from "react";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getCurrentUser } from "../apicalls/users";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../redux/userSlice";
import { Layout, Menu, message } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  HomeOutlined,
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

function ProtectedRoute({ children }) {
  //using useSelector Hook
  const { user } = useSelector((state) => state.user);
  console.log("StateUser  ", user);

  // before setting the user, we check if the user is valid or not
  // our frontend needs to make an API call
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Home",
      icon: <HomeOutlined />,
      onClick: () => navigate("/"),
    },
    user &&
      user.isAdmin && {
        label: "Admin Dashboard",
        icon: <DashboardOutlined />,
        onClick: () => navigate("/admin"),
      },
    {
      label: `${user ? user.name : " "}`,
      icon: <UserOutlined />,
      // nested Objects
      children: [
        {
          label: (
            <span
              onClick={() => {
                navigate("/profile");
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },
        {
          // If we click the logOut button, remove the token and return to the login page
          label: (
            <Link to="/login" onClick={() => localStorage.removeItem("token")}>
              Log out
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ].filter(Boolean); // Filter out undefined items (like admin dashboard for non-admins)
  /*
  const getValidUser = async () => {
    try {
      dispatch(showLoading());
      const response = await getCurrentUser();

      if (response.success) {
        dispatch(setUser(response.data)); // we send out user data to redux to be used in every component

        //if user is not admin or given admin control on the dashboard only if isAdmin is true
        // if (!response.data.isAdmin) {
        //   message.error("You are not allowed to access this page");
        //   navigate("/");
        // }

        dispatch(hideLoading());
      } else {
        dispatch(setUser(null));
        message.error(response.message);
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
*/
  const getValidUser = useCallback(async () => {
    try {
      dispatch(showLoading());
      const response = await getCurrentUser();

      if (response.success) {
        dispatch(setUser(response.data));
        dispatch(hideLoading());
      } else {
        dispatch(setUser(null));
        message.error(response.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      dispatch(hideLoading());
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, [navigate, getValidUser]);

  //whenever the component mounted again i.e component is loaded again this useEffect is called and getValidUser is called
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, [navigate, getValidUser]);

  /*
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, [navigate]);
  */

  return (
    user && (
      <>
        <Layout>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
              Book My Show
            </h3>
            <Menu theme="dark" mode="horizontal" items={navItems}></Menu>
          </Header>
          <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
            {children}
          </div>
        </Layout>
      </>
    )
  );
}

export default ProtectedRoute;
