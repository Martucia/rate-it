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
import Soon from './pages/systemPages/Soon';
import Kanban from './components/tasks/kanban/Kanban';
import Task from './components/modals/task/Task';

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
        <Route path='invite/:token' element={<Login />} />
        <Route
          path='/'
          element={
            <AuthRequire>
              <Layout />
            </AuthRequire>
          }
        >
          <Route path='tasks/' element={<Tasks />}>
            <Route path='settings' element={<Soon />} />
            <Route path='analytics' element={<Soon />} />
            <Route path='files' element={<Soon />} />
            <Route path='' element={<Soon />} />
          </Route>
          <Route path='project/:projectId/*' element={<Tasks />}>
            <Route
              path=''
              element={<Kanban />}
            >
              <Route
                path='details/:id'
                element={<Task />}
              />
            </Route>
            <Route
              path='calendar'
              element={<Soon />}
            />
            <Route
              path='dashboard'
              element={<Soon />}
            />
            <Route
              path='progress'
              element={<Soon />}
            />
            <Route
              path='more'
              element={<Soon />}
            />
            <Route
              path='*'
              element={<NotFound fixed={false} />}
            />
          </Route>
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
