import icon from '@/assets/icon_search.png';

/**
 * 검색바 검색 버튼
 *
 * @returns 돋보기 모양이 들어간 검색 버튼
 */

export default function BtnSearch() {
  return (
    <button className="flex justify-center items-center w-30px h-30px rounded-full bg-ppp">
      <img src={icon} className="w-20px h-20px" />
    </button>
  );
}
