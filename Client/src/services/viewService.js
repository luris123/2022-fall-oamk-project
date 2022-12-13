import axios from "axios";
const baseUrl = "https://group5-visualizationtool.onrender.com";
const localUrl = "http://localhost:3001";

const createView = async (settings) => {
  const user = JSON.parse(window.localStorage.getItem("loggedUser"));

  const response = await axios.post(localUrl + "/users/newView", settings, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  });
  return response.data;
};

const getView = async (url) => {
  const response = await axios.post(localUrl + "/users/getView", { url });
  return response.data;
};

const deleteView = async (url) => {
  const user = JSON.parse(window.localStorage.getItem("loggedUser"));

  const response = await axios.post(localUrl + "/users/deleteView", url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
      },
    });
  return response.data;
};

const exportedObject = { createView, getView, deleteView };

export default exportedObject;
