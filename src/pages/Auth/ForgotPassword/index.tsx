import { Link } from 'react-router-dom';
import LanguagePicker from '../../../components/LanguagePicker';
import Logo from '../../../components/Logo';

const ForgotPassword = () => {
  return (
    <>
      <Logo />
      <div className="w-auto h-10 left-[769px] top-[408px] absolute text-white text-4xl font-bold font-['Montserrat'] leading-[48px]">
        Khôi phục mật khẩu
      </div>
      <div className="h-20 left-[661px] top-[520px] absolute flex-col justify-start items-start gap-2 inline-flex">
        <div className="text-white text-base font-semibold font-['Montserrat'] leading-normal">
          Email
        </div>
        <div className="self-stretch pl-4 pr-6 pt-[11px] pb-[13px] bg-[#2B2B3F] rounded-lg border border-gray-500 justify-start items-center inline-flex">
          <div className="text-violet-50 text-base font-normal font-['Montserrat'] leading-normal">
            tuyetnguyenngoc@gmail.com.vn
          </div>
        </div>
      </div>
      <button className="px-6 py-4 left-[856px] top-[648px] absolute bg-orange-500 rounded-lg justify-center items-center gap-2 inline-flex">
        <div className="w-40 text-center text-white text-lg font-medium font-['Montserrat'] leading-normal tracking-tight">
          Xác nhận
        </div>
      </button>
      <div className="left-[662px] top-[464px] absolute text-white text-base font-normal font-['Montserrat'] leading-normal">
        Vui lòng nhập địa chỉ email đã đăng ký để yêu cầu khôi phục mật khẩu
      </div>
      <Link
        to={'/login'}
        className="left-[890px] top-[1005px] absolute text-orange-500 text-base font-semibold font-['Montserrat'] underline leading-normal"
      >
        Quay lại đăng nhập
      </Link>

      <LanguagePicker />
    </>
  );
};

export default ForgotPassword;
