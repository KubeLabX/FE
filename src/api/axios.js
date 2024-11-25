import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL, //장고 서버
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// request의 header에 토큰
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');

        if (token) {
            config.headers = {
                ...config.headers,
                'Authorization': `Bearer ${token}`
            };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response 에서 에러 발생 시 처리(추후 필요하면 추가해야함)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            // 인증 실패 처리
            // 여기서 로그아웃이나 토큰 갱신 로직 추가 가능
        }
        return Promise.reject(error);
    }
);

export default api;