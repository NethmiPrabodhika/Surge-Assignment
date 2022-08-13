import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../form.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  /**
   * When the user clicks the submit button, prevent the default action, then send a POST request to the
   * server with the user's email and password, and if successful, navigate to the home page.
   */
  const login = async (e) => {
    e.preventDefault();
    try {
      /* Creating an object with the email and password. */
      const loginData = {
        email,
        password,
      };

      /* Sending a POST request to the server with the user's email and password. */
      const result = await axios.post("http://localhost:8000/login", loginData);

      /* Checking if the status is true. */
      if (result?.data?.status === true) {
        /* Setting the local storage with the type and status. */
        localStorage.setItem("type", result?.data?.type);
        localStorage.setItem("status", result?.data?.status);
        /* Reloading the page. */
        navigate("/");
        window.location.reload();
      } else {
        /* Setting the local storage with the status. */
        localStorage.setItem("status", result?.data?.status);
        /* Redirecting the user to the register page. */
        navigate("/register");
        window.location.reload();
      }
    } catch (err) {
      console.error(err.response.data.errorMessage);
      alert(err.response.data.errorMessage);
    }
  };

  return (
    <div className="main">
      <div className="sub-main">
        <h1>Log in</h1>
        <hr />
        <form onSubmit={login}>
          <label>E-mail</label>
          <div>
            <input
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-input"
            />
          </div>
          <label>Password</label>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-input"
            />
          </div>
          <div>
            <button className="button" type="submit">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
