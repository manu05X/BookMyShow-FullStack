import React, { useState } from "react";
import { Button } from "antd";
import TheatreFormModal from "./TheatreFormModal";

const TheatreList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <div className="d-flex justify-content-end">
        <Button onClick={() => setIsModalOpen(true)} type="primary">
          Add Theatre
        </Button>

        {isModalOpen && (
          <TheatreFormModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
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
