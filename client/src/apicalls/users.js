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
    //api/users/get-current-user this is a frontend call to get-current-user endpoint in server  saving user data in redux
    // so that it can be used in every component for checking if user is valid or not for current user
    const response = await axiosInstance.get("api/users/get-current-user");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
