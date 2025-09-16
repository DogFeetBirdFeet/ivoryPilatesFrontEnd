import logo from '@/assets/ivorypilates_logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { menuRoute } from '@/constants/route';
import { useState } from 'react';
import { motion, AnimatePresence, type HTMLMotionUlProps } from 'framer-motion';

// Framer Motion ClassName 타입에러 방지용 컴포넌트
const MotionUl = motion('ul') as React.FC<HTMLMotionUlProps>;

export default function MenuBar({ path }: { path: string }) {
  const navigate = useNavigate();
  const [_, curRoute, curSmRoute = ''] = path.split('/');
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full h-full flex flex-col gap-50px bg-ppm px-20px py-50px">
      {/* 로고 */}
      <div className="flex justify-center gap-5px cursor-pointer" onClick={() => navigate('/dashboard')}>
        <img src={logo} className="w-[68px] h-[60px]" draggable={false} />
        <p className="text-[28px] text-white font-black leading-[30px]">
          IVORY
          <br />
          PILATES
        </p>
      </div>

      {/* 메뉴바 */}
      <nav>
        <ul className="flex flex-col gap-30px">
          {menuRoute.map(({ route, name, iconDefault, child }) => {
            const parentKey = route.replace('/', '');
            const isParentActive = parentKey === curRoute;

            return (
              <li
                key={route}
                className="flex flex-col gap-5px"
                onMouseEnter={() => setHovered(parentKey)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* 대분류 */}
                <Link to={route} className="flex items-center gap-15px">
                  <img src={iconDefault} className="w-[22px] h-[22px]" />
                  <span className={`text-xl font-medium ${isParentActive ? 'text-yellow' : 'text-white'}`}>{name}</span>
                </Link>

                {/* 소분류 */}
                <AnimatePresence initial={false}>
                  {child && child.length > 0 && (hovered === parentKey || isParentActive) && (
                    <MotionUl
                      className="ml-30px"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      {child.map(({ route: childRoute, name: childName, iconDefault: childIcon }) => {
                        const childKey = childRoute.replace('/', '');
                        const isChildActive = isParentActive && curSmRoute === childKey;

                        return (
                          <li key={childRoute || 'root'}>
                            <Link to={`${route}${childRoute}`} className="h-30px flex items-center gap-15px">
                              <img src={childIcon} className="w-[15px] h-[15px]" />
                              <span className={`text-base font-normal ${isChildActive ? 'text-yellow' : 'text-white'}`}>
                                {childName}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </MotionUl>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
