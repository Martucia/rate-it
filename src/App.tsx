import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import Header from './components/header/Header'

function App() {


  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
