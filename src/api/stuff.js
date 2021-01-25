import axios from "axios";

const URL = "https://mern-crud-server.herokuapp.com";

export const createStuff = async (data) => {
  const response = await axios.post(`${URL}/api/stuff`, data);

  return response;
};

export const getStuffs = async () => {
  const response = await axios.get(`${URL}/api/stuff`);

  return response;
};

export const getStuff = async (stuffId) => {
  const response = await axios.get(`${URL}/api/stuff/${stuffId}`);

  return response;
};

export const editStuff = async (data, id) => {
  const response = await axios.put(`${URL}/api/stuff/${id}`, data);

  return response;
};

export const deleteStuff = async (stuffId) => {
  const response = await axios.delete(`${URL}/api/stuff/${stuffId}`);

  return response;
};
