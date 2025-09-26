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
    <div className="w-full h-full flex flex-col bg-ppm px-20px py-50px overflow-hidden">
      {/* 로고 */}
      <div
        className="flex justify-center gap-5px cursor-pointer mb-50px flex-shrink-0"
        onClick={() => navigate('/dashboard')}
      >
        <img src={logo} className="w-[68px] h-[60px]" draggable={false} />
        <p className="text-[28px] text-white font-black leading-[30px]">
          IVORY
          <br />
          PILATES
        </p>
      </div>

      {/* 메뉴바 */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="flex flex-col gap-30px">
          {menuRoute.map(({ route, name, iconDefault, child }) => {
            const parentKey = route.replace('/', '');
            const isParentActive = parentKey === curRoute;
            const shouldShowChild = child && child.length > 0 && (hovered === parentKey || isParentActive);

            return (
              <li
                key={route}
                className="flex flex-col"
                onMouseEnter={() => setHovered(parentKey)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* 대분류 */}
                <Link to={route} className="flex items-center gap-15px h-30px mb-5px">
                  <img src={iconDefault} className="w-[22px] h-[22px]" />
                  <span className={`text-xl font-medium ${isParentActive ? 'text-yellow' : 'text-white'}`}>{name}</span>
                </Link>

                {/* 소분류 */}
                <div className="overflow-hidden">
                  <AnimatePresence initial={false}>
                    {shouldShowChild && (
                      <MotionUl
                        className="ml-30px"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: 'auto',
                          opacity: 1,
                          transition: {
                            height: { duration: 0.2, ease: 'easeOut' },
                            opacity: { duration: 0.15, delay: 0.05 },
                          },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: {
                            height: { duration: 0.2, ease: 'easeIn' },
                            opacity: { duration: 0.1 },
                          },
                        }}
                      >
                        <div className="pb-5px">
                          {child.map(({ route: childRoute, name: childName, iconDefault: childIcon }) => {
                            const childKey = childRoute.replace('/', '');
                            const isChildActive = isParentActive && curSmRoute === childKey;

                            return (
                              <li key={childRoute || 'root'} className="h-25px flex items-center gap-15px">
                                <Link to={`${route}${childRoute}`} className="h-30px flex items-center gap-10px">
                                  <img src={childIcon} className="w-[15px] h-[15px]" />
                                  <span
                                    className={`text-base font-normal ${isChildActive ? 'text-yellow' : 'text-white'}`}
                                  >
                                    {childName}
                                  </span>
                                </Link>
                              </li>
                            );
                          })}
                        </div>
                      </MotionUl>
                    )}
                  </AnimatePresence>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
