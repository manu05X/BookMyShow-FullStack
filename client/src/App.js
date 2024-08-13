/*
we import useSelector from "react-redux" and get the loader value from redux loading.
*/

import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import ProtectedRoute from "./component/ProtectedRoute";
import About from "./pages/About";

function App() {
  //const { loading } = useSelector((state) => state.loading);
  // const state = useSelector((state) => state);
  // const { loading } = state.loader || {};
  const { loading } = useSelector((state) => state.loader);
  const { user } = useSelector((state) => state.user);

  //console.log(loading);
  console.log(user);
  return (
    <div>
      {loading && (
        <div className="loader-container">
          {" "}
          <div className="loader"> </div>{" "}
        </div>
      )}

      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

/*
https://github.com/mrinal1224/BookMyShow-Final

*/
