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

    const data = JSON.parse(localData);

    if (!Array.isArray(data) || data.length === 0) {
      navigate('/signIn');
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signIn' element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
