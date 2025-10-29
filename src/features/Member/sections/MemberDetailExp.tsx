import type { IMember } from '../types';

export default function MemberDetailExp({ memberData }: { memberData: IMember }) {
  return <div>{memberData.mstId}</div>;
}
