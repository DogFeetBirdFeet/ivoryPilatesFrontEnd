import { useNavigate } from 'react-router-dom';

export default function MiniBar() {
  const navigate = useNavigate();
  return (
    <div className="h-svh w-[80px] flex-shrink-0 sticky z-20 top-0 left-0 bg-ppm px-[20px] py-[50px]">
      {/* 로고 */}
    </div>
  );
}
