import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Header from '../Header';

const UserLayout = () => {
  return (
    <div className="w-full h-[1080px] relative bg-zinc-800">
      <Header />
      <Navbar />
      <Outlet />
    </div>
  );
};

export default UserLayout;
