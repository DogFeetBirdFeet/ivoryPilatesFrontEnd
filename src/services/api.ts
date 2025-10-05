import axios from 'axios';

function resolveApiBaseUrl(): string {
    // 개발 환경에서는 직접 백엔드에 연결 (포트 8080)
    if (import.meta.env.DEV) {
        return 'http://localhost:8080';
    }

    // 프로덕션 환경에서는 환경변수 또는 기본값 사용
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
}
export const API_BASE_URL = resolveApiBaseUrl();

// axios 인스턴스 생성
export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const clsPassApi = {
    getClsViewAll: (acctId: string) => {
        return api.get(`/test/${acctId}`);
    },

    // 결제 수강권 목록 조회
    getClsPassList: (params?: {
        payDateFrom?: string;
        payDateTo?: string;
        refundDateFrom?: string;
        refundDateTo?: string;
        searchPayName?: string;
        searchName?: string;
        useYn?: string;
        refundYn?: string;
        payMethod?: string;
    }) => {
        return api.get('/test', {
            params: {
                tableName: 'clsView',
                ...params
            }
        });
    }
} 