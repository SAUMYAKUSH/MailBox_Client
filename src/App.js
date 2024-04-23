import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import SignUpForm from './Component/Forms/SignUpForm';
import Login from './Component/Login';
import Password from './Component/Password';
import ComposeEmail from './Component/ComposeEmail';
import Inbox from './Component/Inbox';
import SentMail from "./Component/SentMail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUpForm/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='password' element={<Password/>}></Route>
        <Route path='/compose' element={<ComposeEmail/>}></Route>
        <Route path='/inbox' element={<Inbox/>}/>
        <Route path='/sent' element={<SentMail/>}/>
      </Routes>
    </Router>
  )
}

export default App;
