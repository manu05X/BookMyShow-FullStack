import React from "react";
import { Form, Input, Button, Radio, message } from "antd";
import { Link } from "react-router-dom";
import { RegisterUser } from "../apicalls/users";

function Register() {
  const submitForm = async (value) => {
    // console.log(value);
    try {
      const response = await RegisterUser(value); //sending the value/object from the register page frontend to the registerUsers front end proxy server function
      //console.log(res);
      if (response.success) {
        // response.success from server after successful registration
        message.success(response.message); //  message.success is from ant lib

        window.location.href = "/login";
      } else {
        // response.
        message.error(response.message); // message.error is from antd lib
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1>Register to BookMyShow</h1>
          </section>
          <section className="right-section">
            <Form layout="vertical" onFinish={submitForm}>
              <Form.Item
                label="Name"
                htmlFor="name"
                name="name"
                className="d-block"
                rules={[{ required: true, message: "Name is required!" }]}
              >
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  rules={[{ required: true, message: "Email is required!" }]}
                  autoComplete="Previsuly used Name"
                ></Input>
              </Form.Item>
              <Form.Item
                label="Email"
                htmlFor="email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Email is required!" }]}
              >
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="Previsuly used email"
                ></Input>
              </Form.Item>
              <Form.Item
                label="Password"
                htmlFor="password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required!" }]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter the password"
                  autoComplete="Previsuly used password"
                ></Input>
              </Form.Item>

              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Sign Up
                </Button>
              </Form.Item>
              <Form.Item
                label="Register as a Partner"
                htmlFor="role"
                name="role"
                className="d-block text-center"
                initialValue={false}
                rules={[
                  { required: true, message: "Please select an option!" },
                ]}
              >
                <div className="d-flex justify-content-start">
                  <Radio.Group name="radiogroup" className="flex-start">
                    <Radio value={"partner"}>Yes</Radio>
                    <Radio value={"user"}>No</Radio>
                  </Radio.Group>
                </div>
              </Form.Item>
            </Form>
            <div>
              <p>
                Already a user? <Link to="/login">Login now</Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </>
  );
}

export default Register;
