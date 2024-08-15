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
} from "@ant-design/icons";

function ProtectedRoute({ children }) {
  //using useSelector Hook
  const { user } = useSelector((state) => state.user);
  console.log("StateUser  ", user);

  // before seting the user we check if the user is valid user or not
  //our frontend need to make a api call
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    {
      label: "Home",
      icon: <HomeOutlined />,
    },

    {
      label: `${user ? user.name : " "}`,
      icon: <UserOutlined />,

      //nested Objects
      children: [
        {
          label: (
            <span
              onClick={() => {
                user.isAdmin ? navigate("/admin") : navigate("/profile");
              }}
            >
              My Profile
            </span>
          ),
          icon: <ProfileOutlined />,
        },
        {
          label: (
            <Link to="/login" onClick={() => localStorage.removeItem("token")}>
              Log out
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  const getValidUser = async () => {
    try {
      dispatch(showLoading());
      const response = await getCurrentUser();

      if (response.success) {
        dispatch(setUser(response.data)); // we send out user data to redux to be used in every component
        dispatch(hideLoading());
      } else {
        dispatch(setUser(null));
        message.error(response.message);
        // dispatch(hideLoading());
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

    // <>
    //   {/* <div>{children}</div>
    //   {user ? <h1>{user.name}</h1> : <h1>Loading...</h1>} */}

    // </>
  );
}

export default ProtectedRoute;
