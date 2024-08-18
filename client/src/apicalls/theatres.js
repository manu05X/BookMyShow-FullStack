import { axiosInstance } from "./index";

export const addThreatre = async (payloads) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatre/add-theatre",
      payloads
    );
    return response.data;
  } catch (error) {
    //console.log(error);
    return error.message;
  }
};

export const updateThreatre = async (payloads) => {
  try {
    const response = await axiosInstance.put(
      "/api/threatre/update-threatre",
      payloads
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Get all theatres for the Admin route
export const getAllThreatresForAdmin = async () => {
  try {
    const response = await axiosInstance.get("/api/threatre/get-all-threatres");
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Get theatres of a specific owner
export const getAllThreatreByOwner = async (payloads) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatre/get-all-theatres-by-owner",
      payloads
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// Delete Threatre
export const deleteThreatre = async (payloads) => {
  try {
    const response = await axiosInstance.delete(
      "/api/theatre/delete-threatre",
      payloads
    );

    return response.data;
  } catch (error) {
    return error.message;
  }
};
