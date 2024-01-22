import React from 'react';

const Pagination = () => {
  return (
    <div className="w-[1485px] justify-between items-start inline-flex">
      <div className="justify-start items-center gap-2 flex">
        <div className="w-[58.45px] opacity-70 text-violet-50 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
          Hiển thị{' '}
        </div>
        <div className="w-[48.37px] h-8 relative bg-slate-800 rounded border border-orange-500">
          <div className="left-[16.19px] top-[6px] absolute text-center text-violet-50 text-base font-normal font-['Source Sans Pro'] leading-tight">
            12
          </div>
        </div>
        <div className="opacity-70 text-violet-50 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
          hàng trong mỗi trang
        </div>
      </div>
      <div className="w-[203px] h-[26px] relative">
        <div className="w-4 h-4 left-0 top-[5px] absolute">
          <img
            className="w-[6.38px] h-[11.09px] left-[11.19px] top-[2.45px] absolute origin-top-left rotate-180"
            src="https://via.placeholder.com/6x11"
          />
        </div>
        <div className="w-4 h-4 left-[191px] top-[5px] absolute">
          <img
            className="w-[6.38px] h-[11.09px] left-[4.81px] top-[2.45px] absolute"
            src="https://via.placeholder.com/6x11"
          />
        </div>
        <div className="w-[152px] h-[26px] left-[32px] top-0 absolute">
          <div className="w-[26px] h-[26px] left-[26px] top-0 absolute">
            <div className="w-[26px] h-[26px] left-0 top-0 absolute bg-orange-500 bg-opacity-50 rounded-full" />
            <div className="w-[8.36px] h-[18.57px] left-[9.29px] top-[4px] absolute text-stone-50 text-sm font-medium font-['Montserrat'] tracking-tight">
              2
            </div>
          </div>
          <div className="left-0 top-[3px] absolute opacity-70 text-violet-50 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
            1
          </div>
          <div className="left-[69px] top-[3px] absolute opacity-70 text-violet-50 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
            3
          </div>
          <div className="left-[95px] top-[3px] absolute opacity-70 text-violet-50 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
            ...
          </div>
          <div className="left-[127px] top-[3px] absolute opacity-70 text-violet-50 text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
            100
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
