import { axiosInstance } from "./index";

export const addThreatre = async (payloads) => {
  try {
    const response = await axiosInstance.post(
      "/api/theatre/add-theatre",
      payloads
    ); // /api/theatre
    return response.data;
  } catch (error) {
    //console.log(error);
    return error.message;
  }
};

export const updateThreatre = async (payloads) => {
  try {
    const response = await axiosInstance.put(
      "/api/theatre/update-theatre",
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
    const response = await axiosInstance.get("/api/theatre/get-all-theatres"); //api/theatre/get-all-theatres //api/theatre/get-all-theatres
    return response.data;
  } catch (error) {
    return error.response;
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
