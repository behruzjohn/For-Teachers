import { useEffect } from 'react';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const localData = localStorage.getItem('teacherInfo');

    if (!localData) {
      navigate('/signIn');
      return;
    }

    try {
      const data = JSON.parse(localData);

      if (!data) {
        navigate('/signIn');
      }
    } catch (error) {
      navigate('/signIn');
    }
  }, [navigate]);
  
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
