import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem('teacherInfo');

  useEffect(() => {
    if (isLogin) {
      navigate('/home');
    } else {
      navigate('/signIn');
    }
  }, [isLogin, navigate]);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/signIn' element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
