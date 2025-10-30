import { api } from '@/services/Common/api';

export const scheduleApi = {
  getScheduleList: (params: { schDate?: string }) => {
    return api.get('/test/calSchView', {
      params: params,
    });
  },
};

export const scheduleApiWeek = {
  getScheduleList: (params: { staDate?: string; endDate?: string }) => {
    return api.get('/test/calSchView', {
      params: params,
    });
  },
};

export const scheduleApiMonth = {
  getScheduleList: (params: { searchUserNm?: string; schMonth?: string }) => {
    return api.get('/test/calSchView', {
      params: params,
    });
  },
};
