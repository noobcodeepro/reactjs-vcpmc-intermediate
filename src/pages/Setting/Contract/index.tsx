import React from 'react';

const SettingContract = () => {
  return (
    <>
      <div className="left-[772px] top-[976px] absolute justify-start items-start gap-10 inline-flex">
        <div className="px-6 py-3 rounded-lg border border-orange-500 justify-center items-center gap-2 flex">
          <div className="w-[120px] text-center text-orange-500 text-base font-semibold font-['Montserrat'] leading-normal">
            Hủy
          </div>
        </div>
        <div className="px-6 py-3 bg-orange-500 rounded-lg justify-center items-center gap-2 flex">
          <div className="w-[120px] text-center text-white text-base font-semibold font-['Montserrat'] leading-normal">
            Lưu
          </div>
        </div>
      </div>

      {/* <div className="w-2 h-[72px] left-0 top-[725px] absolute bg-orange-500 rounded-md" />
        <div className="left-[229px] top-[86px] absolute flex-col justify-start items-start inline-flex">
          <div className="text-neutral-200 text-4xl font-bold font-['Montserrat'] leading-[48px]">
            Loại hợp đồng
          </div>
        </div> */}

      <div className="left-[229px] top-[114px] absolute text-white text-4xl font-bold font-['Montserrat'] leading-[48px]">
        Loại hợp đồng
      </div>
      <div className="h-[444px] px-6 py-4 left-[229px] top-[186px] absolute bg-slate-800 bg-opacity-70 rounded-2xl flex-col justify-start items-start gap-6 inline-flex">
        <div className="self-stretch h-[412px] justify-start items-start inline-flex">
          <div className="w-[99px] flex-col justify-center items-start inline-flex">
            <div className="self-stretch h-12 pl-2 py-2 justify-start items-start gap-2 inline-flex">
              <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                STT
              </div>
            </div>
            <div className="self-stretch h-[47px] pt-3 opacity-80 flex-col justify-center items-start gap-[15px] flex">
              <div className="w-[35px] text-right text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                1
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-8 pt-3 opacity-80 flex-col justify-center items-start gap-[15px] flex">
              <div className="w-[35px] text-right text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                2
              </div>
            </div>
          </div>
          <div className="grow shrink basis-0 h-[412px] flex-col justify-start items-start inline-flex">
            <div className="h-12 py-2 justify-start items-start gap-2 inline-flex">
              <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                Loại hợp đồng
              </div>
            </div>
            <div className="self-stretch h-[47px] pt-[5px] opacity-80 flex-col justify-start items-start gap-1.5 flex">
              <div className="w-[216px] h-9 relative bg-gray-700 rounded border border-gray-500">
                <div className="left-[12px] top-[7px] absolute text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Trọn gói
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="self-stretch h-[41px] pt-[5px] opacity-80 flex-col justify-start items-start gap-1.5 flex">
              <div className="w-[216px] h-9 relative bg-gray-700 rounded border border-gray-500">
                <div className="left-[12px] top-[7px] absolute text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  Giá trị bài hát/ lượt phát
                </div>
              </div>
            </div>
          </div>
          <div className="grow shrink basis-0 h-[412px] flex-col justify-start items-start inline-flex">
            <div className="h-12 pr-2 py-2 justify-start items-start gap-2 inline-flex">
              <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                Doanh thu VCPCM/hợp đồng (Đơn vị: %){' '}
              </div>
            </div>
            <div className="h-[47px] pt-[5px] opacity-80 flex-col justify-start items-start gap-1.5 flex">
              <div className="w-[70px] h-9 relative bg-gray-700 rounded border border-gray-500">
                <div className="left-[12px] top-[7px] absolute text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  20%
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="h-[41px] pt-[5px] opacity-80 flex-col justify-start items-start gap-1.5 flex">
              <div className="w-[70px] h-9 relative bg-gray-700 rounded border border-gray-500">
                <div className="left-[12px] top-[7px] absolute text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  20%
                </div>
              </div>
            </div>
          </div>
          <div className="grow shrink basis-0 h-[412px] flex-col justify-start items-start inline-flex">
            <div className="h-12 pr-2 py-2 justify-start items-start gap-2 inline-flex">
              <div className="text-orange-300 text-sm font-bold font-['Montserrat'] leading-tight tracking-tight">
                Ngày áp dụng
              </div>
            </div>
            <div className="h-[47px] pt-[5px] opacity-80 flex-col justify-start items-start gap-1.5 flex">
              <div className="w-40 h-9 relative bg-gray-700 rounded border border-gray-500">
                <div className="left-[13.33px] top-[8px] absolute text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  21/07/2021 13:00:00
                </div>
              </div>
              <div className="self-stretch h-[0px] opacity-30 border border-gray-500"></div>
            </div>
            <div className="h-[41px] pt-[5px] opacity-80 flex-col justify-start items-start gap-1.5 flex">
              <div className="w-[159px] h-9 relative bg-gray-700 rounded border border-gray-500">
                <div className="left-[12px] top-[7px] absolute text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
                  21/07/2021 13:00:00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="left-[1810px] top-[230px] absolute flex-col justify-start items-start inline-flex">
        <div className="h-[130px] p-4 bg-slate-800 rounded-tl-2xl flex-col justify-center items-center gap-2.5 flex">
          <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex">
            <div className="w-8 h-8 relative" />
          </div>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Thêm lịch áp dụng
          </div>
        </div>
        <div className="h-28 p-4 bg-slate-800 rounded-bl-2xl flex-col justify-center items-center gap-2.5 flex">
          <div className="p-2.5 bg-gray-500 bg-opacity-50 rounded-[67px] justify-start items-start gap-2.5 inline-flex">
            <div className="w-8 h-8 relative" />
          </div>
          <div className="self-stretch opacity-70 text-center text-white text-xs font-medium font-['Montserrat'] leading-[18px] tracking-tight">
            Xóa
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingContract;
