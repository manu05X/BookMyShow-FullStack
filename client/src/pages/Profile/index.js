import React from "react";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import TheatreList from "./TheatreList";
import Booking from "./Booking";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  const TabItems = [
    //we need key to iterate through tabs i.e labels
    {
      key: "1",
      label: "Theatres",
      children: <TheatreList />,
    },
    {
      key: "2",
      label: "Bookings",
      children: <Booking />,
    },
  ];

  return (
    <>
      <div>
        <h1>Welcome {user.name} to your Profile...</h1>
        <Tabs defaultActiveKey="1" items={TabItems} />
      </div>
    </>
  );
};

export default Profile;
