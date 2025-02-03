import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (credentials) => {
  return await axios.post(`${API_URL}/login`, credentials);
};

export const getUserDetails = async (token) => {
  return await axios.get(`${API_URL}/dashboard`, {
    headers: { Authorization: token },
  });
};
