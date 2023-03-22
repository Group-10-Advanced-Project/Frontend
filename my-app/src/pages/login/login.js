import React, { useState, useEffect } from "react";
import "./login.css";
import useAuth from "../../hooks/useAuth";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
const LOGIN_URL = "/api/auth/login";

function Login() {
  const { setAuth } = useAuth(); //globalAuth
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies, setCookie] = useCookies(["name"]);
  const from = location.state?.from?.pathname || "/dashboard";

  useEffect(() => {
    document.title = "Login";
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(LOGIN_URL, {
        email,
        password,
        headers: { "content-type": "application/json" },
        withCredentials: true,
      });
      const superadmin = response.data.user.is_super_admin;
      const access_token = response?.data?.access_token;

      setCookie("token", response.data.access_token);
      setCookie("super-admin", response.data.user.is_super_admin);
      setAuth({ email, password, superadmin, access_token });
      localStorage.setItem("token", "true");

      toast.success("Login successful!");

      navigate(from, { replace: true });
    } catch (error) {
      if (!error.response) {
        toast.error("No Internet Connection!");
      } else {
        console.error(error);
        toast.error("Email/Password invalid!");
      }
    }

    setLoading(false);
  };

  return (
    <div id="login-wrap">
      <div className="login-image"></div>
      <div className="login-card">
        <div className="login-card-header">
          <h1 className="display-md">
            <span className="text-main">Log</span>
            <span className="text-primary">In</span>
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="login-card-form">
          <div className="input-group">
            <label className="labelLogin">Email</label>
            <input
              type="email"
              className="inputLogin"
              placeholder="email@example.com"
              required
              autoComplete="off"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <i className="m-i iconsLogin">
              <AiOutlineMail />
            </i>
          </div>
          <div className="input-group">
            <label className="labelLogin">Password</label>
            <input
              type="password"
              className="inputLogin"
              placeholder="*********"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <i className="m-i iconsLogin">
              <AiFillLock />
            </i>
          </div>
          <div className="btn-group">
            <button type="submit" vlaue="Submit" className="btn btn-primary">
              {loading ? "Checking..." : "Login"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
