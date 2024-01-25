import { Navigate, Outlet } from 'react-router-dom';
import Header from '../Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../contexts/store';

const GuestLayout = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <>
      {user ? (
        <>
          <Navigate to={'/records'} />
        </>
      ) : (
        <>
          <div className="w-full min-h-screen flex flex-col justify-between items-center bg-[#1E1E2E]">
            <Header />
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};

export default GuestLayout;
