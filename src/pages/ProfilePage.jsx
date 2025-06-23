import React, { useState } from 'react';
import Profile from '../components/Profile';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isSignup, setIsSignup] = useState(false); 

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Login failed');
      }

      const data = await res.json();
      setUser(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const username = form.username.value;
    const email = form.email.value;
    const password = form.password.value;
//UPDATE THE FETCH ONCE WE HAVE THE BACKEND
    try {
      const res = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Signup failed');
      }

      const data = await res.json();
      setUser(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setUser(null);
    }
  };

  return (
    <div className="container">
      {user ? (
        <Profile user={user} />
      ) : (
        <div className="content">
          <div className="info">
            <h1 className="logo">Elimu <span>mart</span></h1>
            <p>
              Elimu Mart helps you connect and share books and learning materials with your peers.
            </p>
          </div>

          <div className="login-card">
            {isSignup ? (
              <form onSubmit={handleSignup} className="login-form">
                <h2>Create New Account</h2>
                {error && <p className="error">{error}</p>}
                <input type="text" name="username" placeholder="Username" required />
                <input type="email" name="email" placeholder="Email address" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit" className="login-btn">Sign Up</button>
                <button
                  type="button"
                  className="back-btn"
                  onClick={() => setIsSignup(false)}
                >
                  Back to Login
                </button>
              </form>
            ) : (
              <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <input type="email" name="email" placeholder="Email address or phone number" required />
                <input type="password" name="password" placeholder="Password" required />
                <button type="submit" className="login-btn">Log in</button>
                <a href="#" className="forgot-link">Forgotten password?</a>
                <hr />
                <button
                  type="button"
                  className="create-btn"
                  onClick={() => setIsSignup(true)}
                >
                  Create new account
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
