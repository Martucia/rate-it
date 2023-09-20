import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import NotFound from './pages/systemPages/404'
import Error from './pages/systemPages/400';
// import Meetings from './pages/meetings/Meetings';
// import Soon from './pages/systemPages/Soon';
import Tasks from './pages/tasks/Tasks';
import Header from './components/header/Header';
import NavMenu from './components/navMenu/NavMenu';
import Registration from './pages/auth/Registration';
import Login from './pages/auth/Login';
import { useAppDispatch, useAppSelector } from './actions/redux';
import { auth } from './actions/user';
import CreateProject from './components/modals/createProject/CreateProject';
import ParticipantsChange from './components/modals/participantsChange/ParticipantsChange';

function App() {
  const [isNavMenuOpen, setNavMenuOpen] = useState(true);

  const isAuth = useAppSelector(state => state.userReducer.isAuth);
  const { projectCreateOpen, projectParticipantsOpen } = useAppSelector(state => state.commonReducer)

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(auth());
  }, [])

  useEffect(() => {
    if (!isAuth && isAuth !== null && pathname !== '/reg') {
      navigate('/log', { replace: true });
    } else if (pathname === '/') {
      navigate('/tasks', { replace: true });
    }
  }, [pathname, isAuth]);

  const handleToggleNavMenu = () => {
    setNavMenuOpen(!isNavMenuOpen);
  }

  if (isAuth !== null) return (
    <div className={`app ${isAuth ? isNavMenuOpen ? "nav-menu-open" : "nav-menu-close" : "nav-menu-hidden"}`}>
      {isAuth &&
        <NavMenu toggle={handleToggleNavMenu} isOpen={isNavMenuOpen} />
      }

      <div className='app-wrapper'>
        <Header />

        <div className="app-page">
          <Routes>
            <Route path='/tasks/*' element={<Tasks />} />
            <Route path='/reg' element={<Registration />} />
            <Route path='/log' element={<Login />} />
            {/* <Route path='/settings' element={<Soon fixed={false} />} /> */}
            <Route path='*' element={<NotFound />} />
            <Route path='/error' element={<Error />} />
          </Routes>
        </div>
      </div>

      {projectCreateOpen && <CreateProject />}
      {projectParticipantsOpen && <ParticipantsChange />}
    </div>
  );
}

export default App
