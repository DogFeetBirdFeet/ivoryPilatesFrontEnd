import { api } from '@/services/Common/api';

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
      params: searchDto,
    });
  },
  getClsPassData: (clsPassId: number) => {
    return api.get(`/test/clsPassView`, {
      params: {
        clsPassId: clsPassId,
      },
    });
  },
};
