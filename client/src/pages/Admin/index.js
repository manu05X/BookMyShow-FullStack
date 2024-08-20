import React from "react";
import { Tabs } from "antd";
import MovieList from "./MovieList";
import TheatresTable from "./TheatresTable";

const Admin = () => {
  const onChange = (key) => {
    console.log(key);
  };

  const items = [
    //we need key to iterate through tabs i.e labels
    {
      key: "1",
      label: "Movies",
      children: <MovieList />,
    },
    {
      key: "2",
      label: "Theatere Requests",
      children: <TheatresTable />,
    },
  ];

  return (
    <>
      <div>
        <h1>Welcometo your Admin Profile...</h1>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>
    </>
  );
};

export default Admin;
