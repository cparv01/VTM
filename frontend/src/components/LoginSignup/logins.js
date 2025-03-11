import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const Logins = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fName, setFName] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError(null);
  };



  useEffect(() => {
  //       var xhr = new XMLHttpRequest();
  //     xhr.withCredentials = true;

  //     xhr.addEventListener("readystatechange", function() {
  //       if(this.readyState === 4) {
  //         console.log(this.responseText);
  //       }
  //     });

  //     xhr.open("POST", "http://localhost:11434");

  //     xhr.send();
  }, [])

  const handleLogin = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('Something went wrong');
    }
    setIsLoading(false);
  };

  const handleRegister = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name: fName }),
      });

      const data = await response.json();

      console.log(response)
      if (response.ok) {
        return <Navigate to="../product/list" />;
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      setError('Something went wrong');
    }

    setIsLoading(false);
  };

  if (isLoggedIn) {
    return <Navigate to="../product/list" />;
  }

  return (
    <div className="row justify-content-center pt-5">
      <div className="col-sm-6">
        <div className="card p-4">
          <h1 className="text-center mb-3">{isLogin ? 'Sign in' : 'Sign Up'}</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          {isLogin ? (
            <>
              <div className="form-group">
                <label>Email address:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={handleLogin}
                className={`btn btn-primary mt-4 ${isLoading ? 'disabled' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Sign in...' : 'Sign in'}
              </button>
            </>
          ) : (
            <>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Name"
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Email address:</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password:</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={handleRegister}
                className={`btn btn-primary mt-4 ${isLoading ? 'disabled' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </>
          )}
          <p className="text-center mt-3">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <span className="link" onClick={handleToggle}>
              {isLogin ? <b>Sign up</b> : <b>Sign in</b>}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Logins;                                                                                                                                                                                                ;







// import React, { useState } from 'react';
// import axios from 'axios';

// export default function Logins () {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://your-api-url/login', {
//         email,
//         password,
//       });
//       console.log(response.data); // Assuming your backend returns a token upon successful login
//       // Store the token in local storage or session storage
//       localStorage.setItem('token', response.data.token);
//     } catch (error) {
//       console.error('Login error:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };
