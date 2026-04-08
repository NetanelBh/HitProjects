import axios from "axios";

const SERVER_URI = import.meta.env.VITE_SERVER_URI;

const API = axios.create({
    baseURL: SERVER_URI,
    withCredentials: true
});


API.interceptors.request.use((config) => {
	const token = sessionStorage.getItem("token");	
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default API;