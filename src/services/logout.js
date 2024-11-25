import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

//로그아웃 처리 함수
export const handleLogout = async () => {
    try {
        // 서버에 로그아웃 요청
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            await api.post('/logout/', { refresh_token: refreshToken });
        }
        // 로컬 저장소 및 상태 초기화
        localStorage.clear();
        window.location.href = '/';
    } catch (error) {
        console.error('Logout failed:', error);
        window.location.href = '/';
    }
};