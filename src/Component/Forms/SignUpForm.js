import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


function SignUpForm() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email:'',
        pass:'',
        conf:'',
    });
    
    const handleSubmission = async (e)=>{
      e.preventDefault();

      if(values.pass !== values.conf) {
        alert('Please enter matching passwords');
        return;
      }
      try {
        const userCredential = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCRLO00hJ5etUWEEIWrl2co5zDEvbP7CQ4',
      {
        method: 'POST',
        body: JSON.stringify({
          email: values.email,
          password: values.pass,
          returnSecureToken: true,
        }),
        headers: {'Contenr-Type': 'application/json' },
      }
    ).then((response) => response.json());

    if(userCredential) {
      console.log('User signed up:', userCredential);
      navigate('/login');
      setValues({
        email: '',
        pass: '',
        conf: '',
      });
    } else {
      console.log('Error signing up.');
    }
      }catch(error) {
        console.log('Error signing up:', error.message);
      }
    };
  return (
    <div style={{
       backgroundImage:'url(https://images.unsplash.com/photo-1555392660-4f93688b1f21?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
       backgroundSize:'cover',
       backgroundPosition:'center',
       backgroundRepeat:'no-repeat',
       minHeight: '100vh',
       margin: 0,
       display: 'flex',
       alignItems:'center',
       justifyContent: 'center',}}>
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          <div className='card'>
            <div className='card-header'>
              <h2 className='text-center'>SignUp</h2>
            </div>
            <div className='card-body'>
              <div className='mb-3'>
                <label className='form-label'>Email:</label>
                <input
                type='email'
                className='form-control'
                placeholder='Enter Your Email'
                value={values.email}
                onChange={(event)=> setValues((prev) => ({...prev, email: event.target.value}))}></input>
              </div>
              <div className='mb-3'>
                <label className='form-label'>Password:</label>
                <input 
                type="password"
                className='form-control'
                placeholder='Create Your Password'
                value={values.pass}
                onChange={(event)=> setValues((prev)=> ({...prev, pass: event.target.value}))
                }
                />
              </div>
              <div className='mb-3'>
                <label className='form-label'>Confirm Password:</label>
                <input
                type='password'
                className='form-contrl'
                placeholder='Control your password'
                value={values.conf}
                onChange={(event)=> setValues((prev)=>({...prev, conf: event.target.value}))
                }
                />
              </div>
              <div>
                <button className='btn btn-primary' onClick={handleSubmission}>Sign Up</button>
                <p className='mt-3 text-center'>Already have an account?</p>
                <p className='text-center'>
                  <Link to="/Login">Login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    </div>
  )
}

export default SignUpForm;
