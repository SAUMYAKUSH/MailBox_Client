import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import SignUpForm from './Component/Forms/SignUpForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/SignUp' element={<SignUpForm/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;
