import iconDashboard from '@/assets/icon/white/icon_dashboard.png';
import iconDashboardCur from '@/assets/icon/yellow/icon_dashboard.png';
import iconMember from '@/assets/icon/white/icon_mem.png';
import iconMemberCur from '@/assets/icon/yellow/icon_mem.png';
import iconMemberSm from '@/assets/icon/white/icon_mem_sm.png';
import iconSche from '@/assets/icon/white/icon_sche.png';
import iconScheCur from '@/assets/icon/yellow/icon_sche.png';
import iconScheSm from '@/assets/icon/white/icon_sche_sm.png';
import iconClsLog from '@/assets/icon/white/icon_cls_log.png';
import iconClsLogCur from '@/assets/icon/yellow/icon_cls_log.png';
import iconClsPass from '@/assets/icon/white/icon_cls_pass.png';
import iconClsPassCur from '@/assets/icon/yellow/icon_cls_pass.png';
import iconClsPkg from '@/assets/icon/white/icon_cls_pkg.png';
import iconClsPkgCur from '@/assets/icon/yellow/icon_cls_pkg.png';
import iconIns from '@/assets/icon/white/icon_ins.png';
import iconInsCur from '@/assets/icon/yellow/icon_ins.png';
import iconInsSm from '@/assets/icon/white/icon_ins_sm.png';
import iconSales from '@/assets/icon/white/icon_sales.png';
import iconSalesCur from '@/assets/icon/yellow/icon_sales.png';
import iconSalesSm from '@/assets/icon/white/icon_sales_sm.png';

interface RouteItem {
  route: string;
  name: string;
  iconDefault: string;
  iconCur?: string;
  child?: RouteItem[];
}

export const menuRoute: RouteItem[] = [
  { route: '/dashboard', name: '홈 바로가기', iconDefault: iconDashboard, iconCur: iconDashboardCur },
  {
    route: '/member',
    name: '회원 관리',
    iconDefault: iconMember,
    iconCur: iconMemberCur,
    child: [
      { route: '', name: '회원 조회', iconDefault: iconMemberSm },
      { route: '/group', name: '그룹회원 조회', iconDefault: iconMemberSm },
      { route: '/regist', name: '회원 등록', iconDefault: iconMemberSm },
    ],
  },
  {
    route: '/schedule',
    name: '일정 관리',
    iconDefault: iconSche,
    iconCur: iconScheCur,
    child: [
      { route: '', name: '회원 일정', iconDefault: iconScheSm },
      { route: '/ins-month', name: '강사 월간 일정', iconDefault: iconScheSm },
      { route: '/ins-week', name: '강사 주간 일정', iconDefault: iconScheSm },
      { route: '/ins-day', name: '강사 일간 일정', iconDefault: iconScheSm },
    ],
  },
  { route: '/class-log', name: '수업일지 관리', iconDefault: iconClsLog, iconCur: iconClsLogCur },
  { route: '/class-pass', name: '결제 수강권 관리', iconDefault: iconClsPass, iconCur: iconClsPassCur },
  { route: '/class-package', name: '회차별 상품 관리', iconDefault: iconClsPkg, iconCur: iconClsPkgCur },
  {
    route: '/instructor',
    name: '강사 관리',
    iconDefault: iconIns,
    iconCur: iconInsCur,
    child: [
      { route: '', name: '전체 강사 조회', iconDefault: iconInsSm },
      { route: '/regist', name: '강사 등록', iconDefault: iconInsSm },
    ],
  },
  {
    route: '/sales',
    name: '매출 관리',
    iconDefault: iconSales,
    iconCur: iconSalesCur,
    child: [
      { route: '', name: '월간 매출', iconDefault: iconSalesSm },
      { route: '/year', name: '연간 매출', iconDefault: iconSalesSm },
    ],
  },
];
