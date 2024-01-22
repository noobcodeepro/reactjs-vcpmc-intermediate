import React from 'react';
import LanguagePicker from '../../components/LanguagePicker';

const Header = () => {
  return (
    <div className="w-full h-20 left-0 top-0 absolute">
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
      <LanguagePicker />
    </div>
  );
};

export default Header;
