//import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Footer from '../components/footer';
import { doSignInWithEmailAndPassword } from '../config/auth';
import { useAuth } from '../contexts/authContext';
import { Fragment, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function SignIn() {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleForgotPassword = () => {
    sendPasswordResetEmail(email);
    alert('Password reset email sent');
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setErrorMessage('');

      if (!email || !password) {
        setErrorMessage('Please enter an email and password');
        return;
      }

      if (!isSigningIn) {
        setIsSigningIn(true);
        await doSignInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <Fragment>
      {userLoggedIn && <Navigate to={`/dashboard`} replace={true} />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isSigningIn}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link onClick={handleForgotPassword} variant="body2" style={{ cursor: 'pointer' }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  variant="body2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/signup');
                  }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {errorMessage && (
          <Typography variant="body2" color="error" align="center">
            {errorMessage}
          </Typography>
        )}
        <Footer sx={{ mt: 8, mb: 4 }} />
      </Container>
    </Fragment>
  );
}
