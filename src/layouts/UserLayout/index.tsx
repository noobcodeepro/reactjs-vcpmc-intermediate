import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Header from '../Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../contexts/store';
import DrawerNavbar from '../Navbar/DrawerNavbar';

const UserLayout = ({ isDrawer = false }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <>
      {!user ? (
        <>
          <Navigate to={'/login'} />
        </>
      ) : (
        <>
          <div className="w-full min-h-[1080px] bg-[#1E1E2E]">
            <Header />
            {isDrawer ? <DrawerNavbar /> : <Navbar />}
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};

export default UserLayout;
