/*
await axiosInstance.post("api/users/register", value);
this will hit the server i.e our proxy in front end at port 8000 and api endpoint "api/users/register" 
and its "value"(i.e name,email,pass) will be comming form front end register page in this case in JSON format

*/
import { axiosInstance } from "./index";

export const RegisterUser = async (value) => {
  try {
    const response = await axiosInstance.post("api/users/register", value);
    return response.data;
  } catch (error) {
    console.error(error);
    // response.status(400).send({
    //   success: false,
    //   message: "Error logging in user",
    //   error: error.message,
    // });
  }
};

export const LoginUser = async (value) => {
  try {
    const response = await axiosInstance.post("api/users/login", value);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("api/users/get-current-user");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
