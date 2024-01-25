import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks/Auth/useAuth';

const UserTab = () => {
  const currentUser = useAuth();

  return (
    <>
      <Link
        to={'/profile'}
        className="h-10 left-[1542px] top-[24px] justify-end items-center gap-3 inline-flex"
      >
        {/* <img src="https://via.placeholder.com/40x41" /> */}
        {currentUser?.photoURL ? (
          <>
            <Avatar size={40} className="border-gray-400" src={currentUser.photoURL}></Avatar>
          </>
        ) : (
          <>
            <Avatar size={40} className="border-gray-400">
              {currentUser?.displayName ? currentUser.displayName.charAt(0) : 'A'}
            </Avatar>
          </>
        )}

        <div className="w-[84px] h-10 relative">
          <div className="left-[5px] top-0 truncate text-[16px] text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
            {currentUser?.displayName && currentUser.displayName}
          </div>
          <div className="left-[6px] top-[26px]  text-amber-700 text-sm font-medium font-['Montserrat'] tracking-tight">
            Admin
          </div>
        </div>
      </Link>
    </>
  );
};

export default UserTab;
