import React from 'react';

const Download = () => {
  return (
    <>
      <div className="w-[350px] h-[373px] left-[409px] top-[570px] absolute bg-slate-800 bg-opacity-70 rounded-2xl">
        <div className="px-6 py-4 left-[71px] top-[285px] absolute bg-orange-500 rounded-lg justify-center items-center gap-2 inline-flex">
          <div className="w-40 text-center text-white text-lg font-medium font-['Montserrat'] leading-normal tracking-tight">
            Tool Upload
          </div>
        </div>
        <div className="w-[189px] h-[104px] left-[80px] top-[92px] absolute">
          <div className="w-[189px] h-[104px] left-0 top-0 absolute">
            <div className="w-[39.45px] h-[47px] left-[78.22px] top-[32px] absolute"></div>
          </div>
        </div>
      </div>
      <div className="w-[350px] h-[373px] left-[870px] top-[570px] absolute bg-slate-800 bg-opacity-70 rounded-2xl">
        <div className="px-6 py-4 left-[71px] top-[285px] absolute bg-orange-500 rounded-lg justify-center items-center gap-2 inline-flex">
          <div className="w-40 text-center text-white text-lg font-medium font-['Montserrat'] leading-normal tracking-tight">
            Tải App Window
          </div>
        </div>
        <img
          className="w-[154px] h-[142px] left-[101px] top-[77px] absolute"
          src="https://via.placeholder.com/154x142"
        />
      </div>
      <div className="w-[350px] h-[373px] left-[1331px] top-[570px] absolute bg-slate-800 bg-opacity-70 rounded-2xl">
        <div className="px-6 py-4 left-[71px] top-[285px] absolute bg-orange-500 rounded-lg justify-center items-center gap-2 inline-flex">
          <div className="w-40 text-center text-white text-lg font-medium font-['Montserrat'] leading-normal tracking-tight">
            Tải App Android
          </div>
        </div>
        <div className="w-[226px] h-44 left-[62px] top-[64px] absolute">
          <div className="w-[226px] h-44 left-0 top-0 absolute bg-stone-300" />
          <img
            className="w-[236px] h-[236px] left-[-5px] top-0 absolute"
            src="https://via.placeholder.com/236x236"
          />
        </div>
      </div>
      <div className="origin-top-left -rotate-180 w-[452.68px] h-[416.96px] left-[2062.68px] top-[1108.96px] absolute"></div>
      <div className="origin-top-left rotate-[29.17deg] w-[883.09px] h-[761.15px] left-[464.02px] top-[-468px] absolute"></div>
      <div className="left-[773px] top-[411px] absolute text-center">
        <span className="text-white text-[32px] font-normal font-['Montserrat']">
          Bạn vui lòng chọn
          <br />
        </span>
        <span className="text-white text-[32px] font-bold font-['Montserrat']">nền tảng</span>
        <span className="text-white text-[32px] font-normal font-['Montserrat']">
          {' '}
          phù hợp để trải nghiệm
        </span>
      </div>
      <div className="w-[639px] h-[114px] left-[726px] top-[263px] absolute">
        <div className="left-0 top-0 absolute text-center">
          <span className="text-stone-50 text-[64px] font-semibold font-['Montserrat'] uppercase">
            ứng dụng
          </span>
          <span className="text-black text-[64px] font-normal font-['Montserrat']"> </span>
          <span className="text-orange-500 text-[64px] font-bold font-['Montserrat']">VCPMC</span>
        </div>
      </div>
      <div className="left-[229px] top-[114px] absolute text-white text-4xl font-bold font-['Montserrat'] leading-[48px]">
        Tải App
      </div>
    </>
  );
};

export default Download;
