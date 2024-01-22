import React from 'react';
import { Outlet } from 'react-router-dom';

const BreadCumb = () => {
  return (
    <>
      <div className="p-0.5 left-[229px] top-[86px] absolute opacity-50 justify-start items-center gap-1 inline-flex">
        <div className="text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
          Quản lý
        </div>
        <div className="w-6 h-6 relative" />
        <div className="text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
          Quản lý hợp đồng
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default BreadCumb;
