import React, { useState } from 'react';
import axios from 'axios';
import './login.css'
import { AiOutlineMail,AiFillLock } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try { 
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password, 
      });
 
      localStorage.setItem('token', response.data.access_token);
      toast.success("Login successful!");
      window.location.href = '/';
    } catch (error) {
      console.error(error);
      toast.error("Email/Password invalid!");
    }

    setLoading(false);
  };

  return (
    <div id="login-wrap">
      <div className="login-image"></div>
      <div className="login-card">
        <div className="login-card-header">
          <h1 className="display-md"><span className="text-main">Log</span><span className="text-primary">In</span></h1>
        </div>
        <form onSubmit={handleSubmit}  className="login-card-form">
          <div className="input-group">
            <label className='labelLogin' >Email</label>
            <input type="email" className='inputLogin'  placeholder="email@example.com" required autoComplete='off' value={email} onChange={(event) => setEmail(event.target.value)}/>
            <i className="m-i iconsLogin"><AiOutlineMail/></i>
          </div>
          <div className="input-group">
            <label className='labelLogin'>Password</label>
            <input type="password" className='inputLogin' placeholder="*********" required  value={password}  onChange={(event) => setPassword(event.target.value)}/>
            <i className="m-i iconsLogin"><AiFillLock/></i>
          </div>
          <div className="btn-group">
            <button type="submit" vlaue="Submit" className="btn btn-primary">{loading ? "Checking..." : "Login"}</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
