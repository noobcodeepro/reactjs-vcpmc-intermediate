import { Navigate } from 'react-router-dom';

function App() {
  let user;
  const data = localStorage.getItem('USER_INFO');
  if (data) {
    user = JSON.parse(data);
  }

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
