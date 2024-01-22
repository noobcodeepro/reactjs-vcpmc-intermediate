import { Checkbox, Form, Input } from 'antd';
import LanguagePicker from '../../../components/LanguagePicker';
import Logo from '../../../components/Logo';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <Logo />
      <div className="left-[855px] top-[396px] absolute text-white text-4xl font-bold font-montserrat leading-[48px]">
        Đăng nhập
      </div>
      <Form>
        <div className="left-[724px] top-[472px] absolute flex-col justify-start items-start gap-2 inline-flex">
          <div className="opacity-70 text-white text-base font-semibold font-montserrat leading-normal">
            Tên đăng nhập
          </div>
          <Input className="w-[471px] pl-4 pr-6 pt-[11px] pb-[13px] text-white bg-[#2B2B3F] focus:bg-transparent focus:border-[#FF7506] hover:bg-transparent hover:border-[#FF7506] rounded-lg" />
        </div>
        <div className="left-[724px] top-[572px] absolute flex-col justify-start items-start gap-2 inline-flex">
          <div className="opacity-70 text-white text-base font-semibold font-montserrat leading-normal">
            Password
          </div>
          <Input
            type="password"
            className="w-[471px] pl-4 pr-6 pt-[11px] pb-[13px] text-white bg-[#2B2B3F] focus:bg-transparent focus:border-[#FF7506] hover:bg-transparent hover:border-[#FF7506] rounded-lg"
          />
        </div>
        <div className="px-6 py-4 left-[856px] top-[744px] absolute bg-[#FF7506] rounded-lg justify-center items-center gap-2 inline-flex">
          <button className="w-40 text-center text-white text-lg font-medium font-montserrat leading-normal tracking-tight">
            Đăng nhập
          </button>
        </div>
        <div className="left-[724px] top-[672px] absolute justify-start items-start gap-2 inline-flex">
          <Form.Item name="remember" noStyle>
            <Checkbox checked className="bg-[#1E1E2E]" />
          </Form.Item>
          <div className="text-white text-base font-normal font-montserrat leading-normal">
            Ghi nhớ đăng nhập
          </div>
        </div>
      </Form>
      <Link
        to={'/forgot-password'}
        className="left-[890px] top-[1005px] absolute text-[#FF7506] text-base font-semibold font-montserrat underline leading-normal"
      >
        Quên mật khẩu?
      </Link>
      <LanguagePicker />
    </>
  );
};

export default Login;
