import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from './pages/systemPages/404'
import Error from './pages/systemPages/400';
import Tasks from './pages/tasks/Tasks';
import Registration from './pages/auth/Registration';
import Login from './pages/auth/Login';
import { useAppDispatch, useAppSelector } from './actions/redux';
import { auth } from './actions/user';
import CreateProject from './components/modals/createProject/CreateProject';
import ParticipantsChange from './components/modals/participantsChange/ParticipantsChange';
import Layout from './components/layout/Layout';
import AuthRequire from './hoc/AuthRequire';

function App() {
  const { isAuth, isLoading } = useAppSelector(state => state.userReducer);
  const { projectCreateOpen, projectParticipantsOpen } = useAppSelector(state => state.commonReducer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuth == null && !isLoading) {
      dispatch(auth());
    }
  }, []);

  if (isAuth !== null) return (
    <div className="app">
      <Routes>
        <Route path='reg' element={<Registration />} />
        <Route path='login' element={<Login />} />
        <Route path='/' element={<AuthRequire><Layout /></AuthRequire>}>
          <Route path='tasks/own' element={<>My tasks</>} />
          <Route path='tasks/:projectId/*' element={<Tasks />} />
          <Route path='*' element={<NotFound />} />
          <Route path='error' element={<Error />} />
        </Route>
      </Routes>


      {projectCreateOpen && <CreateProject />}
      {projectParticipantsOpen && <ParticipantsChange />}
    </div>
  );
}

export default App
