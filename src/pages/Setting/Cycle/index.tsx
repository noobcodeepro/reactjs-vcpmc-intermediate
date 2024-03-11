import { Radio } from 'antd';
import React from 'react';

const Cycle = () => {
  return (
    <>
      <div className="left-[229px] top-[86px] absolute flex-col justify-start items-start inline-flex">
        <div className="p-0.5 opacity-50 justify-start items-center gap-1 inline-flex">
          <div className="text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
            Trang chủ
          </div>
          <div className="w-6 h-6 relative" />
          <div className="text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
            Cài đặt hệ thống
          </div>
          <div className="w-6 h-6 relative" />
          <div className="text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
            Thông tin tác phẩm
          </div>
        </div>
        <div className="text-neutral-200 text-4xl font-bold font-['Montserrat'] leading-[48px]">
          Cài đặt hệ thống
        </div>
      </div>
      <div className="w-[1611px] h-[750px] left-[229px] top-[186px] absolute bg-[#2B2B3F] bg-opacity-70 rounded-2xl">
        <div className="left-[40px] top-[485px] absolute" />
        <div className="left-[40px] top-[40px] absolute text-neutral-200 text-2xl font-bold font-['Montserrat'] leading-normal">
          Cài đặt chu kì đối soát
        </div>
        <div className="left-[40px] top-[118px] absolute justify-start items-start gap-2 inline-flex">
          <Radio name="setting" />
          <div className="text-white text-base font-bold font-['Montserrat'] leading-normal">
            Đối soát theo quý
          </div>
        </div>
        <div className="left-[72px] top-[162px] absolute text-white text-base font-semibold font-['Montserrat'] leading-normal">
          Quý 1:
        </div>
        <div className="left-[72px] top-[202px] absolute text-white text-base font-semibold font-['Montserrat'] leading-normal">
          Quý 2:
        </div>
        <div className="left-[72px] top-[242px] absolute text-white text-base font-semibold font-['Montserrat'] leading-normal">
          Quý 3:
        </div>
        <div className="left-[72px] top-[282px] absolute text-white text-base font-semibold font-['Montserrat'] leading-normal">
          Quý 4:
        </div>
        <div className="left-[149px] top-[162px] absolute text-white text-base font-normal font-['Montserrat'] leading-normal">
          01/06 - 30/07
        </div>
        <div className="left-[149px] top-[202px] absolute text-white text-base font-normal font-['Montserrat'] leading-normal">
          01/08 - 30/09
        </div>
        <div className="left-[149px] top-[242px] absolute text-white text-base font-normal font-['Montserrat'] leading-normal">
          01/10 - 30/11
        </div>
        <div className="left-[149px] top-[282px] absolute text-white text-base font-normal font-['Montserrat'] leading-normal">
          01/12 - 31/12
        </div>
        <div className="left-[40px] top-[338px] absolute justify-start items-start gap-2 inline-flex">
          <Radio name="setting" />
          <div className="text-white text-base font-bold font-['Montserrat'] leading-normal">
            Đối soát theo tháng
          </div>
        </div>
      </div>
    </>
  );
};

export default Cycle;
