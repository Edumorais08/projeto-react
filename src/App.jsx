import {  Outlet } from 'react-router-dom'
import Navbar from "./components/Navbar/Navbar";



import './App.css'

function App() {

  return (
    <>
      <div>
        <Navbar />
      </div>

      <Outlet />
    </>
  )
}

export default App
