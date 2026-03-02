import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';

function App() {
  const isLogin = localStorage.getItem('teacherInfo');

  if (isLogin?.length && isLogin?.length >= 0) {
    return (
      <>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </>
    );
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<SignIn />} />
        <Route path='/signIn' element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
