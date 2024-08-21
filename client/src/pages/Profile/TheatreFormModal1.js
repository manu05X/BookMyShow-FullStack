import React from "react";

import { Col, Modal, Row, Form, Input, Button, message } from "antd";
import { showLoading, hideLoading } from "../../redux/loaderSlice";
import { useDispatch } from "react-redux";
import { addThreatre, updateThreatre } from "../../apicalls/theatres";

import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";

const TheatreFormModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedTheatre,
  setSelectedTheatre,
  formType,
  getData,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  /*
  dispatch = useDispatch();: Sets up the dispatch function to send actions to the Redux store.
const { user } = useSelector((state) => state.user);: Retrieves the current user information from the Redux store.
  */

  // const onFinish = async (value) => {
  //   try {
  //     const response = await addThreatre({ ...value, owner: user._id }); // new Theater along with user id is saved in database using redux.
  //     console.log(response);
  //     if (response.success) {
  //       console.log("Adding new Theater in DB Successfully");
  //       console.log(response.success);
  //       message.success(response.success);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      let response = null;
      if (formType === "add") {
        response = await addThreatre({ ...values, owner: user._id });
      } else {
        values.theatreId = selectedTheatre._id;
        response = await updateThreatre(values);
      }
      console.log(response);
      if (response.success) {
        getData();
        message.success(response.message);
        setIsModalOpen(false);
      } else {
        message.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  /*
  onFinish: This function handles form submission.
dispatch(showLoading());: Dispatches an action to show a loading spinner.
if (formType === "add") { ... }: Checks if the form is for adding a new theatre. If so, it calls addThreatre with the form values and the user's ID.
else { ... }: If editing, it sets the theatreId in the form values and calls updateThreatre to update the theatre data.
console.log(response);: Logs the response from the API call for debugging purposes.
if (response.success) { ... }: If the API call is successful, it refreshes the theatre list (getData()), shows a success message, and closes the modal.
dispatch(hideLoading());: Hides the loading spinner after the API call is complete.
catch (err) { ... }: If there is an error, it hides the loading spinner and shows an error message.

  
  */

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal
    //setSelectedTheatre(null); // Reset the selected theatre if needed
  };

  /*
  handleCancel: This function handles the cancellation of the form.
setIsModalOpen(false);: Closes the modal by setting isModalOpen to false.
setSelectedTheatre(null);: (Commented out) Resets the selected theatre if necessary.
  */

  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        closeIcon={null}
      >
        <Form
          layout="vertical"
          style={{ width: "100%" }}
          initialValues={selectedTheatre}
          onFinish={onFinish} // it trrigers when filling the data is complete and submit is clicked
        >
          {/* 
        Modal: The Ant Design Modal component wraps the form.
open={isModalOpen}: Controls the visibility of the modal.
onCancel={handleCancel}: Closes the modal when the cancel button or outside area is clicked.
footer={null}: Removes the default footer (buttons) from the modal.
closeIcon={null}: Removes the default close icon from the modal.

        
         */}
          <Row
            gutter={{
              xs: 6,
              sm: 10,
              md: 12,
              lg: 16,
            }}
          >
            <Col span={24}>
              <Form.Item
                label="Theatre Name"
                htmlFor="name"
                name="name"
                className="d-block"
                rules={[
                  { required: true, message: "Theatre name is required!" },
                ]}
              >
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter the theatre name"
                ></Input>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Theatre Address"
                htmlFor="address"
                name="address"
                className="d-block"
                rules={[
                  { required: true, message: "Theatre name is required!" },
                ]}
              >
                <TextArea
                  id="address"
                  rows="3"
                  placeholder="Enter the theatre name"
                ></TextArea>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Row
                gutter={{
                  xs: 6,
                  sm: 10,
                  md: 12,
                  lg: 16,
                }}
              >
                <Col span={12}>
                  <Form.Item
                    label="Email"
                    htmlFor="email"
                    name="email"
                    className="d-block"
                    rules={[{ required: true, message: "Email  is required!" }]}
                  >
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter the email"
                    ></Input>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Phone Number"
                    htmlFor="phoneNumber"
                    name="phoneNumber"
                    className="d-block"
                    rules={[
                      { required: true, message: "Phone number is required!" },
                    ]}
                  >
                    <Input
                      id="phoneNumber"
                      type="number"
                      placeholder="Enter the phone number"
                    ></Input>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              style={{ fontSize: "1rem", fontWeight: "600" }}
            >
              Submit the Data
            </Button>
            <Button className="mt-3" block onClick={handleCancel}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TheatreFormModal;

/*
Modal Visibility: The Modal component from Ant Design uses the open prop to determine whether the modal is shown. This is controlled by isModalOpen.
    - If isModalOpen is true, the modal is shown.
    - If isModalOpen is false, the modal is hidden.

Closing the Modal:
    - The handleCancel function is called when the "Cancel" button inside the modal is clicked. 
    - This function calls setIsModalOpen(false) to update the state, setting isModalOpen to false. 
    - This causes the modal to close.

Submit Button: Submits the form data. The htmlType="submit" ensures that the form is submitted when this button is clicked. The button spans the full width (block).
Cancel Button: Cancels the form and closes the modal without submitting the data.
Summary
The TheatreFormModal component is a modal form used for adding or editing theatre information. It manages its own state through the isModalOpen and selectedTheatre props. The form handles both adding a new theatre and editing an existing one, using Redux for managing loading states and API calls. When submitted, the form data is validated and sent to the appropriate API, and the modal is closed afterward.



*/
