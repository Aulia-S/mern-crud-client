import axios from "axios";

export const createStuff = async (data) => {
  const response = await axios.post("/api/stuff", data);

  return response;
};

export const getStuffs = async () => {
  const response = await axios.get("/api/stuff");

  return response;
};

export const getStuff = async (stuffId) => {
  const response = await axios.get(`/api/stuff/${stuffId}`);

  return response;
};

export const editStuff = async (data, id) => {
  const response = await axios.put(`/api/stuff/${id}`, data);

  return response;
};

export const deleteStuff = async (stuffId) => {
  const response = await axios.delete(`/api/stuff/${stuffId}`);

  return response;
};
