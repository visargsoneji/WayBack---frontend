// src/components/Login.jsx
import React, { useState } from 'react';
import { Box, TextField, Button, Link, Typography, Container } from '@mui/material';
import { login, register } from '../api/user/endpoints'

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleLogin = async () => {
    let errors = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errors.email = 'Invalid email format';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Implement the login logic here
      try {
        const data = await login(email, password);
        localStorage.setItem('token', data.access_token);
        setIsLoggedIn(true);
        const lastVisitedPage = localStorage.getItem('lastVisitedPage') || '/search';    
        window.location.href = lastVisitedPage;
        localStorage.removeItem('lastVisitedPage');
      } catch (error) {
        console.error('Error in login user:', error);
        alert(error.response.data.detail)
      }
      
    }
  };

  const handleRegister = async () => {
    let errors = {};

    if (!firstName) {
      errors.firstName = 'First name is required';
    }
    if (!lastName) {
      errors.lastName = 'Last name is required';
    }
    if (!email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      errors.email = 'Invalid email format';
    }
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length > 72) {
        errors.password = 'Password length cannot be more than 72 characters'
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Implement the registration logic here
      try {
        await register(email, firstName, lastName, password)
        alert('User registered successfully');
      } catch (error) {
        console.error('Error registering user:', error);
        alert(error.response.data.detail);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          {isRegistering ? 'Register' : 'Login'}
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          {isRegistering && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                autoComplete="given-name"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={!!fieldErrors.firstName}
                helperText={fieldErrors.firstName}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={!!fieldErrors.lastName}
                helperText={fieldErrors.lastName}
              />
            </>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!fieldErrors.email}
            helperText={fieldErrors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!fieldErrors.password}
            helperText={fieldErrors.password}
          />
          {isRegistering && (
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={!!fieldErrors.confirmPassword}
              helperText={fieldErrors.confirmPassword}
            />
          )}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#95cf00', color: '#fff' , '&:hover': { backgroundColor: '#7fbf00' }}}
            onClick={isRegistering ? handleRegister : handleLogin}
          >
            {isRegistering ? 'Register' : 'Login'}
          </Button>
          <Link
            href="#"
            variant="body2"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Already have an account? Sign in' : 'New user? Register here'}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
