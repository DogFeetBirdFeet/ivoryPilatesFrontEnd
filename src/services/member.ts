import { api } from './api';

export async function getMemberList() {
  const { data } = await api.get('/test/cusMst');
  return data;
}

export async function getMemberDetail(id: string) {
  const { data } = await api.get('/test/cusMstView', { params: { mstId: id } });
  return data[0];
}
