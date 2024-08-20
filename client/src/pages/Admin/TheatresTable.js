import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { message, Table } from "antd";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import { getAllThreatresForAdmin } from "../../apicalls/theatres";

const TheatresTable = () => {
  //3>
  const dispatch = useDispatch();
  //1>
  const [theatres, setTheatres] = useState([]);
  //2>
  const getData = async () => {
    try {
      dispatch(showLoading());
      //3>
      const response = await getAllThreatresForAdmin();
      console.log(response);

      //4>
      if (response.success) {
        const allThreatres = response.data;
        //now we set the theatres as all threatres data is present in allThreatres from backend we will store it in my state
        setTheatres(
          allThreatres.map(function (item) {
            return { ...item, key: `theatre${item._id}` };
          })
        );
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return <>{<Table />}</>;
};

export default TheatresTable;

/*
1> to get the data of theareter we first create states
2> Write a function to get the data of theareter and this will be called in useEffect
3> We call the API from backend to getAllThreatresForAdmin()
4> If response is success then -> we setData using useState as all threatres data is present in allThreatres fetched from backend
5>


*/
