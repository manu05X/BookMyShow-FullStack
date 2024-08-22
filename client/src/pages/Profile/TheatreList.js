import React, { useEffect, useState, useCallback } from "react";
import { Table, Button, message } from "antd";
import TheatreFormModal from "./TheatreFormModal";
import DeleteTheatreModal from "./DeleteTheatreModal";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllThreatreByOwner } from "../../apicalls/theatres";
import ShowModal from "./ShowModal";

const TheatreList = () => {
  const { user } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [formType, setFormType] = useState("add");
  const [theatres, setTheatres] = useState(null);
  const [isShowModalOpen, setIsShowModalOpen] = useState(false);

  const dispatch = useDispatch();

  // Wrap the getData function in useCallback to avoid unnecessary re-creations.
  const getData = useCallback(async () => {
    try {
      dispatch(showLoading());
      const response = await getAllThreatreByOwner({ owner: user._id });
      if (response.success) {
        const allThreatre = response.data;
        console.log(allThreatre);
        setTheatres(
          allThreatre.map(function (item) {
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
  }, [dispatch, user._id]);

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
      title: "Phone Number",
      dataIndex: "phoneNumber",
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
          return `Approved`;
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
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setFormType("edit");
                setSelectedTheatre(data);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(true);
                setSelectedTheatre(data);
              }}
            >
              <DeleteOutlined />
            </Button>
            {/* Adding the Shows if the theatre is approved by the Admin isActive */}
            {data.isActive && (
              <Button
                onClick={() => {
                  setIsShowModalOpen(true);
                  setSelectedTheatre(data);
                }}
              >
                + Shows
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          type="primary"
          onClick={() => {
            setIsModalOpen(true);
            setFormType("add");
          }}
        >
          Add Theatre
        </Button>
      </div>
      <Table dataSource={theatres} columns={columns} />
      {isModalOpen && (
        <TheatreFormModal
          isModalOpen={isModalOpen}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
          setIsModalOpen={setIsModalOpen}
          formType={formType}
          getData={getData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteTheatreModal
          isDeleteModalOpen={isDeleteModalOpen}
          selectedTheatre={selectedTheatre}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          setSelectedTheatre={setSelectedTheatre}
          getData={getData}
        />
      )}
      {isShowModalOpen && (
        <ShowModal
          isShowModalOpen={isShowModalOpen}
          setIsShowModalOpen={setIsShowModalOpen}
          selectedTheatre={selectedTheatre}
        />
      )}
    </>
  );
};

export default TheatreList;

/*
How isModalOpen Controls the Modal
    Initial Render:
        - When the TheatreList component is first rendered, isModalOpen is set to true (as defined by useState(true)).
        - Since isModalOpen is true, the TheatreFormModal component is rendered inside the TheatreList component.
        - The above line of code checks if isModalOpen is true. If it is, the TheatreFormModal component will be included in the rendered output. 
        If isModalOpen is false, the modal component won't be rendered at all.

Toggling the Modal:
    - Opening the Modal: If setIsModalOpen(true) is called anywhere in the component, it will update isModalOpen to true, and the modal will be rendered.
    - Closing the Modal: If setIsModalOpen(false) is called, it will set isModalOpen to false, and the modal will be removed from the rendered output (i.e., it will close).


*/
