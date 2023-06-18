import { RouterProvider } from 'react-router-dom'
import './App.css'
import { router } from './Router'

function App() {
  return (
    <main className="bg-gray-800 pt-24 h-screen min-h-screen max-w-screen">
      <RouterProvider router={router} />
    </main>
  )
}

export default App
