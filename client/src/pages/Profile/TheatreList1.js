import React, { useEffect, useState } from "react"; // Importing React and hooks
import { Table, Button, message } from "antd"; // Importing Ant Design components
import TheatreFormModal from "./TheatreFormModal"; // Importing TheatreFormModal component
import DeleteTheatreModal from "./DeleteTheatreModal"; // Importing DeleteTheatreModal component
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"; // Importing icons for editing and deleting
import { showLoading, hideLoading } from "../../redux/loaderSlice"; // Importing Redux actions for loader
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks for dispatch and state selection
import { getAllThreatreByOwner } from "../../apicalls/theatres"; // Importing API call function
import ShowModal from "./ShowModal"; // Importing ShowModal component

const TheatreList = () => {
  // State hooks for managing modal visibility and data
  const { user } = useSelector((state) => state.user); // Selecting user from Redux state
  const [isModalOpen, setIsModalOpen] = useState(false); // State for managing the visibility of TheatreFormModal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for managing the visibility of DeleteTheatreModal
  const [selectedTheatre, setSelectedTheatre] = useState(null); // State for storing the currently selected theatre
  const [formType, setFormType] = useState("add"); // State for managing form type (add/edit)
  const [theatres, setTheatres] = useState(null); // State for storing list of theatres
  const [isShowModalOpen, setIsShowModalOpen] = useState(false); // State for managing the visibility of ShowModal

  const dispatch = useDispatch(); // Hook for dispatching Redux actions

  /*
  const TheatreList = () => {: Declares a functional component named TheatreList.
const { user } = useSelector((state) => state.user);: Extracts the user object from the Redux store's user slice.
const [isModalOpen, setIsModalOpen] = useState(false);: Manages the state of whether the TheatreFormModal is open or closed. Initially, it's closed (false).
const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);: Manages the state of whether the DeleteTheatreModal is open or closed.
const [selectedTheatre, setSelectedTheatre] = useState(null);: Stores the theatre data that is currently selected for editing or deletion.
const [formType, setFormType] = useState("add");: Determines whether the modal is in "add" or "edit" mode.
const [theatres, setTheatres] = useState(null);: Stores the list of theatres fetched from the server.
const [isShowModalOpen, setIsShowModalOpen] = useState(false);: Manages the state of whether the ShowModal is open or closed.
const dispatch = useDispatch();: Prepares the dispatch function for dispatching actions to the Redux store.
  
  */

  // Function to fetch data from API
  const getData = async () => {
    try {
      dispatch(showLoading()); // Show loading indicator
      const response = await getAllThreatreByOwner({ owner: user._id }); // Fetch theatres by owner from API
      if (response.success) {
        // On success, map the response data to include a unique key for each theatre
        const allThreatre = response.data;
        console.log(allThreatre); // Log response data for debugging
        setTheatres(
          allThreatre.map(function (item) {
            return { ...item, key: `theatre${item._id}` }; // Add unique key to each theatre object
          })
        );
      } else {
        message.error(response.message); // Show error message if response is not successful
      }
      dispatch(hideLoading()); // Hide loading indicator
    } catch (error) {
      dispatch(hideLoading()); // Hide loading indicator in case of error
      message.error(error.message); // Show error message
    }
  };

  /*
  const getData = async () => {: Defines an asynchronous function to fetch theatre data from the server.
dispatch(showLoading());: Dispatches an action to show a loading spinner in the UI.
const response = await getAllThreatreByOwner({ owner: user._id });: Makes an API call to get all theatres owned by the current user.
if (response.success) {: Checks if the API call was successful.
const allThreatre = response.data;: Stores the response data (all theatres) in allThreatre.
setTheatres(allThreatre.map(function (item) { ... })): Maps over each theatre and adds a key property (required by React for list rendering) and updates the theatres state.
message.error(response.message);: Shows an error message if the API call fails.
dispatch(hideLoading());: Dispatches an action to hide the loading spinner.
  
  */

  // Columns configuration for Ant Design Table component
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
        // Render status based on the isActive property
        if (data.isActive) {
          return `Approved`;
        } else {
          return `Pending/ Blocked`;
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
                // Open modal for editing theatre
                setIsModalOpen(true);
                setFormType("edit");
                setSelectedTheatre(data);
              }}
            >
              <EditOutlined />
            </Button>
            <Button
              onClick={() => {
                // Open modal for deleting theatre
                setIsDeleteModalOpen(true);
                setSelectedTheatre(data);
              }}
            >
              <DeleteOutlined />
            </Button>
            {data.isActive && (
              <Button
                onClick={() => {
                  // Open modal to show shows if the theatre is active
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

  /*
  const columns = [: Defines the columns for the Ant Design Table component. Each column represents a field in the theatre data.
title: "Name", dataIndex: "name", key: "name": Defines a column with a header of "Name", which pulls data from the name field in each theatre object.
render: (status, data) => { ... }: Custom rendering logic for the "Status" and "Action" columns. For example, the status is rendered as "Approved" or "Pending/Blocked" based on the isActive property.
render: (text, data) => { return ( ... ) }: In the "Action" column, it renders a set of buttons for editing, deleting, or managing shows for a theatre.
setIsModalOpen(true); setFormType("edit"); setSelectedTheatre(data);: Opens the TheatreFormModal, sets it to "edit" mode, and passes the selected theatre data.
setIsDeleteModalOpen(true); setSelectedTheatre(data);: Opens the DeleteTheatreModal and passes the selected theatre data.
setIsShowModalOpen(true); setSelectedTheatre(data);: Opens the ShowModal if the theatre is active.
  
  
  */

  // useEffect hook to fetch data when component mounts
  useEffect(() => {
    getData();
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Add Theatre
        </Button>
      </div>
      <Table dataSource={theatres} columns={columns} />{" "}
      {/* Render table with data and columns */}
      {isModalOpen && (
        <TheatreFormModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          formType={formType}
          getData={getData}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteTheatreModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedTheatre={selectedTheatre}
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

<div className="d-flex justify-content-end">: A container to hold the "Add Theatre" button, positioned at the end of the flex container.
<Button type="primary" onClick={() => setIsModalOpen(true)}>Add Theatre</Button>: A button that, when clicked, opens the TheatreFormModal for adding a new theatre.
<Table dataSource={theatres} columns={columns} />: Renders the theatre data in a table format, using the columns array for the structure.
{isModalOpen && <TheatreFormModal ... />}: Conditionally renders the TheatreFormModal if isModalOpen is true.
{isDeleteModalOpen && <DeleteTheatreModal ... />}: Conditionally renders the DeleteTheatreModal if isDeleteModalOpen is true.
{isShowModalOpen && <ShowModal ... />}: Conditionally renders the ShowModal if isShowModalOpen is true.
Summary
This TheatreList component is a dynamic and interactive table that manages a list of theatres. It allows users to:

Add, edit, or delete theatres using modals.
View theatre information in a structured table format.
Handle various actions through buttons associated with each theatre (like editing, deleting, or managing shows).
Manage the component state and Redux store interactions for seamless UI updates and data management.

*/
