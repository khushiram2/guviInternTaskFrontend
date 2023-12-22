import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'; 
import { Login } from './Pages/Loginin'
import { Register } from './Pages/Register'
import { PrivateRoute } from './PrivateRoute/PrivateRoute'
import { Home } from './Pages/Home';
import { ToastContainer } from 'react-toastify';
import { Otp } from './Pages/Otp';
import { WriteNotePage } from './Pages/WriteNotePage';
import { NoteContextProvider } from './Context/context';



function App() {


  return (
    <div className='App'>
      <NoteContextProvider>

    <ToastContainer/>
    <Routes>
    <Route  path='/' element={<Navigate replace to="/login"/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/:userId/otp" element={<Otp/>}/>

    <Route path='/:userId' element={<PrivateRoute/>}>
    <Route path="/:userId/home" element={<Home/>}/>
    <Route path="/:userId/:noteId" element={<WriteNotePage/>}/>

    </Route>
    </Routes>
      </NoteContextProvider>
    </div>
  )
}

export default App
