import React from "react";

import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import { LoginUser } from "../apicalls/users";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

function Login() {
  const dispatch = useDispatch();
  const submitForm = async (Value) => {
    try {
      const response = await LoginUser(Value);
      console.log(response);
      //we will save the token recevied from the response i.e from server/backend and save it in my local storage

      if (response?.success) {
        // response.success from server after successful registration
        message.success(response.message); //  message.success is from ant lib
        localStorage.setItem("token", response.token); // store the token from server response

        dispatch(setUser(response.user)); //Setting up user value from response from server
      } else {
        // response.
        message.error(response?.message || "Login failed"); // message.error is from
      }

      //After successful Login we need to go to Home page of Application
      //we need to useNavigation hook or DOM property using href

      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Login to BookMyShow</h1>
          </section>

          <section className="right-section">
            <Form layout="vertical" onFinish={submitForm}>
              <Form.Item
                label="Email"
                htmlFor="email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your Email"
                  autoComplete="current-email"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                htmlFor="password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required" }]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your Password"
                  autoComplete="current-password"
                />
              </Form.Item>

              <Form.Item className="d-block">
                <Button
                  type="primary"
                  block
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p>
                New User? <Link to="/register">Register Here</Link>
              </p>
              <p>
                Forgot Password? <Link to="/forget">Click Here</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </>
  );
}

export default Login;
