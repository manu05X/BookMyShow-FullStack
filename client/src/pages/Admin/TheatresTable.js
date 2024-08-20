import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { message, Table, Button } from "antd";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import {
  getAllThreatresForAdmin,
  updateThreatre,
} from "../../apicalls/theatres";

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

  //6> Handle status change
  const handleStatusChange = async (theatre) => {
    try {
      dispatch(showLoading());
      //7> toggle the isActive flag between true and false
      let values = {
        ...theatres,
        theatreId: theatre._id,
        isActive: !theatre.isActive,
      };
      const response = await updateThreatre(values);
      console.log(response, theatre);

      if (response.success) {
        message.success(response.message);
        getData();
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      message.error(error.message);
    }
  };

  //5
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Owner",
      dataIndex: "owner",

      render: (text, data) => {
        return data.owner && data.owner.name;
      },
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, data) => {
        if (data.isActive) {
          return "Approved";
        } else {
          return "Pending/Blocked";
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, data) => {
        return (
          <div className="d-flex align-items-center gap-10">
            {data.isActive ? (
              <Button onClick={() => handleStatusChange(data)}>Block</Button>
            ) : (
              <Button onClick={() => handleStatusChange(data)}>Approve</Button>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return <>{<Table dataSource={theatres} columns={columns} />}</>;
};

export default TheatresTable;

/*
1> to get the data of theareter we first create states
2> Write a function to get the data of theareter and this will be called in useEffect
3> We call the API from backend to getAllThreatresForAdmin()
4> If response is success then -> we setData using useState as all threatres data is present in allThreatres fetched from backend
5> now to populate the data we need Columns

6> Handle status change of button from nonactive to active on press of the button so, attach this function to button
7> toggle the isActive flag between true and false

*/
