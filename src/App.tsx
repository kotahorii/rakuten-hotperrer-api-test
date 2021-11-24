import { Route, Routes } from 'react-router'
import { Test } from './components/pages/Test'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Test />} />
    </Routes>
  )
}

export default App
