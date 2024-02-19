import { MoreOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { NavItemType, navList } from './routes';

const Navbar = () => {
  const param = useLocation();
  useEffect(() => {
    setSelectedNav(param.pathname);
  }, [param]);
  const [selectedNav, setSelectedNav] = useState<string>('');

  const isSelectedNav = (navItem: NavItemType) => {
    if (navItem.to) {
      if (selectedNav.includes(navItem.to)) {
        return true;
      } else {
        return false;
      }
    } else {
      if (navItem.children) {
        const item = navItem.children.find(nav => {
          if (selectedNav === nav?.key) {
            return true;
          }
          return false;
        });

        if (item) {
          return true;
        } else {
          return false;
        }
      }
    }
  };

  return (
    <div className="w-[170px] h-[1080px] flex flex-col justify-start items-center pt-12 bg-slate-950 rounded-tr-3xl rounded-br-3xl z-50">
      <div className="w-24 h-24 left-[37px] top-[39px] rounded-[70px] mb-24 bg-white"></div>
      <div className="w-full h-[72px] text-center text-white">
        {navList.map(n => (
          <>
            {!n.children ? (
              <Link to={n.to ? n.to : ''} key={n.label} className="h-[72px] w-full my-6 relative">
                {isSelectedNav(n) ? (
                  <>
                    <div className="absolute top-0 bottom-0 w-2 rounded-lg bg-[#ff7506] "></div>
                  </>
                ) : (
                  <></>
                )}
                <div
                  className={`p-2 ${isSelectedNav(n) ? 'text-[#ff7506]' : 'text-[#C8C8DB]'}`}
                  onClick={() => setSelectedNav(n.to || '')}
                >
                  <div className={`mx-auto h-[32px] w-[32px]`}>{n.icon}</div>
                  <div className="text-[14px] py-2 font-montserrat">{n.label}</div>
                </div>
              </Link>
            ) : (
              <div className="h-[72px] w-full my-6 relative" key={n.label}>
                {isSelectedNav(n) ? (
                  <>
                    <div className="absolute top-0 bottom-0 w-2 rounded-lg bg-[#ff7506] "></div>
                  </>
                ) : (
                  <></>
                )}
                <div className="absolute h-fit top-1/2 -translate-y-1/2 right-2">
                  <Dropdown menu={{ items: n.children }} placement="bottomLeft">
                    <MoreOutlined
                      style={{ fontSize: '20px', color: '#C8C8DB', fontWeight: 'bold' }}
                    />
                  </Dropdown>
                </div>
                <div className={`p-2 ${isSelectedNav(n) ? 'text-[#ff7506]' : 'text-[#C8C8DB]'}`}>
                  <div className={`mx-auto h-[32px] w-[32px]`}>{n.icon}</div>
                  <div className="text-[14px] py-2 font-montserrat">{n.label}</div>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
