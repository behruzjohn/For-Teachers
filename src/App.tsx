import { useEffect } from 'react';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';

function App() {
  const navigate = useNavigate();
  const localInfo = localStorage.getItem('teacherInfo');
  const data = JSON.parse(localInfo || '');

  useEffect(() => {
    if ((data?.length && data?.length === null) || data === null) {
      navigate('/signIn');
    } else {
      navigate('/');
    }
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signIn' element={<SignIn />} />
        {/* <Route path='/recend' element={<Recents />} /> */}
      </Routes>
    </>
  );
}

export default App;
