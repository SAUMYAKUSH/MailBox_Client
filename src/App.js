import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import SignUpForm from './Component/Forms/SignUpForm';
import Login from './Component/Login';
import Password from './Component/Password';
import Welcome from './Component/Welcome';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUpForm/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='password' element={<Password/>}></Route>
        <Route path='/welcome' element={<Welcome/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
