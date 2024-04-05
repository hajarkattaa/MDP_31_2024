import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../components/footer';
import { useAuth } from '../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../config/auth';
import { Dashboard } from '@mui/icons-material';
import { Fragment, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setErrorMessage('');

      if (password !== confirmedPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }

      if (!isSigningUp) {
        setIsSigningUp(true);
        await doCreateUserWithEmailAndPassword(email, password, { firstName, lastName });
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setIsSigningUp(false);
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmedPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmedPassword"
                  autoComplete="new-password"
                  value={confirmedPassword}
                  onChange={(e) => setConfirmedPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isSigningUp}>
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  variant="body2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/signin');
                  }}
                >
                  Already have an account? Sign in
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
        <Footer sx={{ mt: 5 }} />
      </Container>
    </Fragment>
  );
}
