import { menuRoute } from '@/constants/route';
import { Link } from 'react-router-dom';

export default function MiniBar({ path }: { path: string }) {
  const [_, curRoute] = path.split('/');

  return (
    <div className="h-svh w-[80px] flex-shrink-0 sticky z-20 top-0 left-0 bg-ppm px-[20px] py-[50px]">
      <nav className="flex flex-col items-center justify-center gap-50px h-full">
        {menuRoute.map(({ route, iconDefault, iconCur }) => {
          const parentKey = route.replace('/', '');
          const isParentActive = parentKey === curRoute;

          return (
            <Link to={route}>
              <img src={isParentActive ? iconCur : iconDefault} className="w-30px h-30px" />
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
