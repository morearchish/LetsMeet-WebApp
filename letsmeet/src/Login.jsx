import { useState } from 'react';
import './Login.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [check, setcheck] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook to navigate

  const handleUsernameChange = (event) => {
    setcheck('');
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setcheck('');
    setPassword(event.target.value);
  };

  const finalstep = () => {
    axios.post('http://localhost:4000/login', {
      username: username,
      password: password
    })
      .then(function (response) {
        if (response.data === null) {
          setUserName('');
          setPassword('');
          setcheck('xyz');
        } else {
          const access_token = response.data.access_token;
          console.log(access_token);
          navigate('/chat'); 
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <body>
      <div className='background'>
        <div className='inner-1'>
          <p style={{ fontSize: "2pc", fontWeight: "bold", marginLeft: "140px" }}>LOGIN HERE</p>
          <div style={{ gap: "50px", display: "grid" }}>
            <div>
              <form id="login-form">
                <p style={{ fontWeight: "bold", fontSize: "20px", marginTop: "0px", marginBottom: "5px" }}>User Name</p>
                <input
                  style={{ height: "35px", width: "480px" }}
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </form>
            </div>
            <div>
              <form id="login-form">
                <p style={{ fontWeight: "bold", fontSize: "20px", marginTop: "0px", marginBottom: "5px" }}>Password</p>
                <input
                  style={{ width: "480px", height: "35px" }}
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </form>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

              {check && <p style={{ color: "red" }}>Log In Credentials are incorrect</p>}

              <button
                style={{ borderRadius: "7px", height: "50px", width: "300px", backgroundColor: "blue", color: "white" }}
                id="login-button"
                onClick={finalstep}>
                LOGIN IN
              </button>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Login;
