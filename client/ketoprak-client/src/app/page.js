'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const signup = async (email, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`Signup failed: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('User created successfully:', data);
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Login failed: ${errorData.detail}`);
      }

      const data = await response.json();
      // Store the token securely
      localStorage.setItem('token', data.access_token);
      console.log('Token obtained successfully:', data);
      router.push('/home'); // Navigate to the home page after login
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const getUserInfo = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/users/me', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to fetch user info: ${errorData.detail}`);
      }

      const data = await response.json();
      console.log('User info:', data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.logoContainer}>
        <Image src="/ketoprak.png" alt="Logo" width={600} height={600} />
      </div>
      <div style={styles.formContainer}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await login(username, password);
          }}
          style={styles.form}
        >
          <label style={styles.label} htmlFor="username">USERNAME</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
          <label style={styles.label} htmlFor="password">PASSWORD</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    padding: '10%',
    backgroundColor: '#00002E',
    color: 'white'
  },
  logoContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    fontSize: '3rem',
  },
  formContainer: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  header: {
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '300px',
  },
  input: {
    backgroundColor: 'transparent',
    border: 'none',
    borderBottom: '2px solid white',
    marginBottom: '20px',
    padding: '10px',
    width: '450px',
    color: 'white',
    fontSize: '20px',
    fontFamily: 'Inter',
    outline: 'none',
    marginBottom: '50px'
  },
  button: {
    padding: '10px',
    backgroundColor: 'white',
    color: 'navy',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    width: '450px',
    borderRadius: '12px',
  },
};

export default LoginPage;
