import React from 'react';

const Feedback = () => {
  return (
    <>
      <div className="left-[229px] top-[114px] absolute text-white text-4xl font-bold font-['Montserrat'] leading-[48px]">
        Feedback
      </div>

      <div className="w-[764px] h-[750px] left-[651px] top-[185px] absolute bg-[#2B2B3F] bg-opacity-70 rounded-2xl">
        <div className="left-[-383px] top-[485px] absolute" />
        <div className="w-[700px] h-20 left-[32px] top-[40px] absolute">
          <div className="w-[700px] h-12 pl-4 pr-6 pt-[11px] pb-[13px] left-0 top-[32px] absolute bg-[#2B2B3F] rounded-lg justify-start items-center inline-flex">
            <div className="text-violet-50 text-base font-normal font-['Montserrat'] leading-normal">
              Ng.Tuyết
            </div>
          </div>
          <div className="w-[154px] left-0 top-[-0px] absolute text-white text-base font-bold font-['Montserrat'] leading-normal">
            Tên người dùng
          </div>
        </div>
        <div className="w-[700px] h-20 left-[32px] top-[144px] absolute">
          <div className="w-[700px] h-12 pl-4 pr-3 py-3 left-0 top-[32px] absolute bg-[#2B2B3F] rounded-lg border border-gray-500 justify-between items-center inline-flex">
            <div className="text-gray-500 text-base font-normal font-['Montserrat'] leading-normal">
              Chọn vấn đề bạn cần được hỗ trợ
            </div>
            <div className="w-6 h-6 relative" />
          </div>
          <div className="left-0 top-0 absolute text-white text-base font-bold font-['Montserrat'] leading-normal">
            Bạn muốn được hỗ trợ vấn đề gì?
          </div>
        </div>
        <div className="w-[700px] h-[332px] left-[32px] top-[248px] absolute">
          <div className="w-[89.83px] left-0 top-[-0px] absolute text-white text-base font-bold font-['Montserrat'] leading-normal">
            Nội dung
          </div>
          <div className="w-[700px] h-[300px] pl-4 pr-6 py-3 left-0 top-[32px] absolute bg-[#2B2B3F] rounded-lg border border-gray-500 justify-start items-start inline-flex">
            <div className="text-gray-500 text-base font-normal font-['Montserrat'] leading-normal">
              Nhập nội dung
            </div>
          </div>
        </div>
      </div>
      <div className="left-[950px] top-[976px] absolute justify-start items-start gap-10 inline-flex">
        <div className="px-6 py-3 bg-orange-500 rounded-lg justify-center items-center gap-2 flex">
          <div className="w-[120px] text-center text-white text-base font-semibold font-['Montserrat'] leading-normal">
            Gửi
          </div>
        </div>
      </div>
    </>
  );
};

export default Feedback;
