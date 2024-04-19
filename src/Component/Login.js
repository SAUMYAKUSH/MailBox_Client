import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { loginSuccess } from '../Slice/authSlice';
import 'bootstrap/dist/css/bootstrap.min.css';



function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email:'',
        pass:'',
    });
    const handleSubmission = async(e) =>{
        e.preventDefault();

        try {
            const userCredential = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCRLO00hJ5etUWEEIWrl2co5zDEvbP7CQ4',
        {
            method: 'POST',
            body: JSON.stringify({
                email: values.email,
                password: values.pass,
                returnSecureToken: true,
            }),
            headers: {'Content-Type': 'application/json'},
        });
        if(userCredential.ok) {
            const userData = await userCredential.json();
            console.log('User logged in:', userData);
            dispatch(loginSuccess({token: userData.idToken, user: userData.email}));
            navigate('/compose');
            setValues({
                email:'',
                pass: '',
            });
        }else {
            const errorData = await userCredential.json();
            console.log('Error logging in:', errorData);
            alert('Incorrect email or password. Please try again.');
        }
        } catch(error) {
            console.log('Error logging in:', error.message);
        }
    };
  return (
    <div style={{ 
        backgroundImage: 'url(https://images.unsplash.com/photo-1555392660-4f93688b1f21?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        margin: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card">
                <div className="card-header">
                  <h2 className="text-center">Login In</h2>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter Your Email"
                      value={values.email}
                      onChange={(event) =>
                        setValues((prev) => ({ ...prev, email: event.target.value }))
                      }
                    />
                  </div>
  
                  <div className="mb-3">
                    <label className="form-label">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter Your Password"
                      value={values.pass}
                      onChange={(event) =>
                        setValues((prev) => ({ ...prev, pass: event.target.value }))
                      }
                    />
                  </div>
                  <div>
                    <button className="btn btn-primary" onClick={handleSubmission}>
                      Login
                    </button>
                    <p className="mt-3 text-center"> have an account?</p>
                    <p className="text-center">
                      <Link to="/signup">Signup</Link>
                    </p>
                    <p className="text-center">
                      <Link to="/password">Forget Password</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  
}

export default Login
