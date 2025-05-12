import axios from "axios";

const BASE_URL = "http://localhost:8081/api/auth";

export const register = (user) => {
    return axios.post(`${BASE_URL}/register`, user);
};

export const login = (credentials) => {
    return axios.post(`${BASE_URL}/login`, credentials);
};

export const setToken = (token) => {
    localStorage.setItem("token", token);
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const logout = () => {
    return axios.post(`${BASE_URL}/logout`);
};