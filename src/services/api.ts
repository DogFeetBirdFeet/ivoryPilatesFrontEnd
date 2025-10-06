import axios from 'axios';

function resolveApiBaseUrl(): string {
    // 개발 환경에서는 직접 백엔드에 연결 (포트 8080)
    if (import.meta.env.DEV) {
        return 'http://localhost:8080';
    }

    // 프로덕션 환경에서는 환경변수 또는 기본값 사용
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
}

// 대문자 필드명을 camelCase로 변환하는 함수
function toCamelCase(str: string): string {
    // 이미 camelCase인 경우 그대로 반환
    if (str === str.charAt(0).toLowerCase() + str.slice(1)) {
        return str;
    }
    // UPPER_CASE를 camelCase로 변환
    return str.toLowerCase().replace(/_([a-z])/g, (_match, letter) => letter.toUpperCase());
}

// 객체의 키를 camelCase로 변환하는 함수
function transformKeysToCamelCase(obj: any): any {
    if (obj === null || obj === undefined) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(transformKeysToCamelCase);
    }

    if (typeof obj === 'object') {
        const transformed: any = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const camelKey = toCamelCase(key);
                transformed[camelKey] = transformKeysToCamelCase(obj[key]);
            }
        }
        return transformed;
    }

    return obj;
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

// 요청 인터셉터 - 인증 토큰 추가
api.interceptors.request.use(
    (config) => {
        // TODO: 인증 토큰이 필요한 경우 여기서 추가
        // const token = localStorage.getItem('accessToken');
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 - 데이터 변환 및 에러 처리
api.interceptors.response.use(
    (response) => {
        // 응답 데이터의 키를 camelCase로 변환
        if (response.data) {
            response.data = transformKeysToCamelCase(response.data);
        }
        return response;
    },
    (error) => {
        // TODO: 401 에러 시 토큰 갱신 로직 추가
        // TODO: 공통 에러 처리 로직 추가
        return Promise.reject(error);
    }
);

export const commonCodeApi = {
    // 공통 코드 조회
    getCommonCodeList: (codeMstId: number) => {
        console.log('공통 코드 조회:', codeMstId);
        return api.get(`/commoncode/${codeMstId}`);
    }
}

export const clsPassApi = {

    // 결제 수강권 목록 조회
    getClsPassList: (searchDto?: {
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
        return api.get('/test/clsView', {
            params: searchDto
        });
    }
}

export const scheduleApi = {
    getScheduleList: (params: {
        schDate?: string;
    }) => {
        return api.get('/test/calSchView', {
            params: params
        });
    }
}