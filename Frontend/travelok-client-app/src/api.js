import axios from 'axios';

const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use(
    (config) => {
        console.log('API Request:', config.method?.toUpperCase(), config.url);
        return config;
    },
    (error) => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

API.interceptors.response.use(
    (response) => {
        console.log('API Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('API Response Error:', error.response?.status, error.response?.data);
        return Promise.reject(error);
    }
);

export const registerHotel = (formData) =>
    API.post("/hotels/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

export const getHotels = () => API.get("/hotels");

export const verifyHotel = (id) => API.post(`/hotels/verify/${id}`);

export const createRoom = (roomData) => API.post("/rooms", roomData);
export const getRoomsByHotel = (hotelId) => API.get(`/rooms/${hotelId}`);

