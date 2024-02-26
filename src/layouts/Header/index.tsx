import LanguagePicker from '../../components/LanguagePicker';
import { useSelector } from 'react-redux';
import { RootState } from '../../contexts/store';
import UserTab from '../../components/auth/UserTab';

const Header = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="left-0 top-0 fixed inset-x-0 z-10 bg-[#1E1E2E]">
      <div className="flex h-20  justify-end mr-16 ml-44 items-center gap-4 ">
        <LanguagePicker />
        {user && (
          <>
            <UserTab />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
