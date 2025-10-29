import type { IMember } from '../types';

export default function MemberDetailReg({ memberData }: { memberData: IMember }) {
  return <div>{memberData.mstId}</div>;
}
