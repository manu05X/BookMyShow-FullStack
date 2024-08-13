/*
import axios from 'axios';
Create a instance of axios and set the headers to Content-Type receved req from client/user into json format and send it to server, 
here if we have login api then it goes to apicalls/users to the respective endpoint


After vefification we will retrive the Bearar token from the local storage
*/

import axios from "axios";

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("token")} `,
  },
});
