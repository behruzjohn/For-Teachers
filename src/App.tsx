import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';

function App() {
  const navigate = useNavigate();

  const isLogin = localStorage.getItem('teacherInfo');

  if (isLogin?.length && isLogin?.length >= 0) {
    navigate('/');
  } else {
    navigate('/signIn');
  }

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
