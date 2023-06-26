import axios from "axios";

export const makeRequest = axios.create({
	baseURL: "http://192.168.238.164:5000/api",
});
