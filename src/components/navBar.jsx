import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import BiotechIcon from '@mui/icons-material/Biotech';
import { useNavigate } from 'react-router-dom';
import { doSignOut } from '../config/auth';
import { useAuth } from '../contexts/authContext';
const pages = ['Home', 'Dashboard', 'About'];

function NavBar() {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate(); //hook to navigate between pages
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const navigateAndClose = (page) => {
    if (page) {
      navigate(page);
    }
    setAnchorElNav(null);
  };

  const handleSignOut = () => {
    doSignOut();
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BiotechIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              DeepPulmo
            </Typography>
          </div>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => navigateAndClose(null)}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => navigateAndClose(page.toLowerCase())}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
              {!userLoggedIn && (
                <>
                  <MenuItem onClick={() => navigateAndClose('/signin')}>Sign In</MenuItem>

                  <MenuItem onClick={() => navigateAndClose('/signup')}>Sign Up</MenuItem>
                </>
              )}
            </Menu>
          </Box>
          <BiotechIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <div onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              DeepPulmo
            </Typography>
          </div>

          <Box gap={1} sx={{ flexGrow: 1, justifyContent: 'flex-end', display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => navigateAndClose(page.toLowerCase())}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
            {!userLoggedIn && (
              <Box gap={1} alignItems={'center'} display={'flex'}>
                <Button color="inherit" variant="outlined" onClick={() => navigate('/signin')}>
                  Sign In
                </Button>

                <Button color="secondary" variant="contained" onClick={() => navigate('/signup')}>
                  Sign Up
                </Button>
              </Box>
            )}
          </Box>

          {userLoggedIn && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={'logout'} onClick={handleSignOut}>
                  <Typography textAlign="center">Sign Out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
