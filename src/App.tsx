import { Route, Routes } from 'react-router'
import { Test } from './components/pages/Test'
import { Layout } from './components/templates/Layout'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Test />} />
    </Routes>
  )
}

export default App
