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
      dispatch(showLoading()); // Show loading indicator

      let response = null;
      if (formType === "add") {
        // Add new Theatre
        response = await addThreatre({ ...values, owner: user._id });
      } else {
        // Update existing Theatre
        values.theatreId = selectedTheatre._id;
        response = await updateThreatre(values);
      }

      console.log(response);

      if (response.success) {
        getData(); // Fetch updated data after successful operation
        message.success("Theatre processed successfully!"); // Display success message
        setIsModalOpen(false); // Close the modal
      } else {
        message.error(response.message); // Display error message from response
      }
    } catch (err) {
      console.error(err); // Log the error
      message.error("An error occurred while processing your request."); // Show generic error message
    } finally {
      dispatch(hideLoading()); // Always hide the loading indicator
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal
    //setSelectedTheatre(null); // Reset the selected theatre if needed
  };

  return (
    <>
      <Modal
        centered
        title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
        open={isModalOpen}
        onCancel={handleCancel}
        width={800}
        footer={null}
      >
        <Form
          layout="vertical"
          style={{ width: "100%" }}
          initialValues={selectedTheatre}
          onFinish={onFinish} // it trrigers when filling the data is complete and submit is clicked
        >
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

*/
