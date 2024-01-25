import { useEffect } from 'react';
import { auth } from './lib/firebase';
import { RootState, useAppDispatch } from './contexts/store';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authLogin, setLoading } from './contexts/Auth/auth.slice';

function App() {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log(authUser);
      if (authUser) {
        dispatch(
          authLogin({
            username: authUser.displayName || 'abc',
            email: authUser.email || 'abc@gmail.com',
            uid: authUser.uid || 'id092313',
          }),
        );
        dispatch(setLoading(false));
      } else {
        console.log('User is not loggin');
      }
    });
  }, [dispatch]);
  return (
    <>
      {user ? (
        <>
          <Navigate to={'/records'} />
        </>
      ) : (
        <>
          <Navigate to={'/login'} />
        </>
      )}
    </>
  );
}

export default App;
