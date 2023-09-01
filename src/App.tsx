import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/home/HomePage'
import Project from './pages/project/Project'
import NotFound from './pages/systemPages/404'
import Error from './pages/systemPages/400';

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/project/*' element={<Project />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/error' element={<Error />} />
      </Routes>
    </>
  )
}

export default App
