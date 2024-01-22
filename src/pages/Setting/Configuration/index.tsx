import React from 'react';

const Configuration = () => {
  return (
    <>
      <div className="left-[229px] top-[114px] absolute text-white text-4xl font-bold font-['Montserrat'] leading-[48px]">
        Cài đặt cấu hình
      </div>
      <div className="w-[571px] h-80 left-[229px] top-[186px] absolute rounded-2xl">
        <img
          className="w-[571px] h-80 left-0 top-0 absolute"
          src="https://via.placeholder.com/571x320"
        />
        <div className="p-2.5 left-[241px] top-[116px] absolute bg-white bg-opacity-50 rounded-[42px] justify-start items-start gap-2.5 inline-flex">
          <div className="w-12 h-12 relative" />
        </div>
      </div>
      <div className="left-[475px] top-[522px] absolute text-white text-lg font-medium font-['Montserrat'] leading-normal tracking-tight">
        Theme 1
      </div>
      <div className="left-[1029px] top-[442px] absolute text-white text-lg font-medium font-['Montserrat'] leading-normal tracking-tight">
        Theme 2
      </div>
      <div className="left-[1291px] top-[442px] absolute text-white text-lg font-medium font-['Montserrat'] leading-normal tracking-tight">
        Theme 3
      </div>
      <div className="left-[1555px] top-[442px] absolute text-white text-lg font-medium font-['Montserrat'] leading-normal tracking-tight">
        Theme 4
      </div>
      <div className="w-[915.02px] h-40 left-[873px] top-[266px] absolute">
        <img
          className="w-60 h-40 left-[75px] top-0 absolute rounded-lg"
          src="https://via.placeholder.com/240x160"
        />
        <img
          className="w-60 h-40 left-[338px] top-0 absolute rounded-lg"
          src="https://via.placeholder.com/240x160"
        />
        <img
          className="w-60 h-40 left-[602px] top-0 absolute rounded-lg"
          src="https://via.placeholder.com/240x160"
        />
      </div>
      <div className="left-[229px] top-[602px] absolute text-white text-base font-bold font-['Montserrat'] leading-normal">
        Ngôn ngữ hiển thị
      </div>
    </>
  );
};

export default Configuration;
