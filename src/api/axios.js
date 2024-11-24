import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, //장고 서버
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;