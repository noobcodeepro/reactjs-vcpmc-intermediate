import { Button, Checkbox, Input } from 'antd';
import Logo from '../../../components/Logo';
import './login.css';
import { useState } from 'react';
import { useAppDispatch } from '../../../contexts/store';
import { authLogin } from '../../../contexts/Auth/auth.slice';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../../../lib/firebase';

const Login = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [error, setError] = useState('');
  const handleLogin = async (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    setError('');
    try {
      dispatch(authLogin({ email, password }))
        .unwrap()
        .then(res => {
          console.log(res);
          if (rememberPassword) {
            const userData = res.user;
            localStorage.setItem('USER_INFO', JSON.stringify(userData));
          }
        })
        .catch(err => {
          setError(err.message);
        });
      // const user = userCredential.user;
      // console.log(userCredential);
      // const userData = {
      //   username: user.displayName ? user.displayName : undefined,
      //   email: email,
      //   uid: user.uid,
      // };
      // if (rememberPassword) {
      //   localStorage.setItem('USER_INFO', JSON.stringify(userData) || '');
      // }

      // dispatch(authLogin(userData));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-[471px] mt-28 bg-red z-1 text-white font-montserrat">
        <Logo />
        <div className="form__title py-10">Đăng nhập</div>

        <label
          className="label opacity-70 text-white text-base font-semibold font-['Montserrat'] leading-normal"
          htmlFor=""
        >
          Tên đăng nhập
        </label>
        <Input
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={`input ${error && 'error'}`}
        />

        <label className="label tracking" htmlFor="">
          Password
        </label>
        <Input.Password
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={`${error && 'error'}`}
        />

        {error && <span className="text-red-500 block mt-4">{error}</span>}

        <div className="remember-password">
          <Checkbox
            id="checkbox"
            checked={rememberPassword}
            onChange={() => setRememberPassword(prev => !prev)}
          />
          <label htmlFor="checkbox" className="remember-password__label">
            Ghi nhớ đăng nhập
          </label>
        </div>

        <div className="w-fit mx-auto mt-8 ">
          <Button
            onClick={handleLogin}
            className="button w-[208px] h-[56px] mt-[16px] mx-[24px] p-3"
          >
            Đăng nhập
          </Button>
        </div>
      </div>

      <div>
        <span className="link">Quên mật khẩu?</span>
      </div>
    </>
  );
};

export default Login;
