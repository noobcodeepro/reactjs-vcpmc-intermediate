import React from 'react';

const UserSelection = () => {
  return (
    <div>
      <div className="w-full h-20 left-[171px] top-0 absolute">
        <div className="w-[1749px] h-20 left-0 top-0 absolute">
          <div className="w-[132px] h-10 left-[1542px] top-[24px] absolute justify-start items-center gap-2 inline-flex">
            <img
              className="w-10 h-[40.58px] relative rounded-[200px]"
              src="https://via.placeholder.com/40x41"
            />
            <div className="w-[84px] h-10 relative">
              <div className="left-[5px] top-0 absolute text-center text-violet-50 text-base font-semibold font-['Montserrat'] leading-normal">
                Ng.Tuyết
              </div>
              <div className="left-[6px] top-[26px] absolute text-center text-amber-700 text-sm font-medium font-['Montserrat'] tracking-tight">
                Admin
              </div>
            </div>
          </div>
          <div className="pl-2 pr-1 py-2 left-[1375px] top-[24px] absolute rounded border border-slate-300 justify-start items-center gap-2 inline-flex">
            <div className="text-center text-white text-sm font-normal font-['Montserrat'] leading-tight tracking-tight">
              Tiếng Việt
            </div>
            <div className="w-[50px] h-6 relative">
              <div className="w-[22px] h-[22px] left-0 top-[1px] absolute" />
              <div className="w-6 h-6 left-[26px] top-0 absolute" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
