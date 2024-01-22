import { Outlet } from 'react-router-dom';

const GuestLayout = () => {
  return (
    <div className="w-full min-h-[1080px] relative bg-[#1E1E2E]">
      <Outlet />
    </div>
  );
};

export default GuestLayout;
