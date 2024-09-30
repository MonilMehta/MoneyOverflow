import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography, Box, Button } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useLocation } from 'react-router-dom';

const MainNavbar = () => {
  const location = useLocation(); // Get the current path
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#004d40', // Teal color for a professional look
      }}
    >
      <Toolbar>
        {/* Navbar Title */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}
        >
          Financial Literacy
        </Typography>
        <Button
          component={Link}
          to="/main/"
          sx={{
            color: isActive('/main/home') ? '#00796b' : '#ffffff', // Darker color for active page
            textDecoration: 'none',
            margin: '0 12px',
            transition: 'color 0.3s ease', // Smooth transition effect
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Home
        </Button>
        <Button
          component={Link}
          to="/main/blog"
          sx={{
            color: isActive('/main/blog') ? '#00796b' : '#ffffff', // Darker color for active page
            textDecoration: 'none',
            margin: '0 12px',
            transition: 'color 0.3s ease', // Smooth transition effect
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Blog
        </Button>
        <Button
          component={Link}
          to="/main/tools"
          sx={{
            color: isActive('/main/tools') ? '#00796b' : '#ffffff', // Darker color for active page
            textDecoration: 'none',
            margin: '0 12px',
            transition: 'color 0.3s ease', // Smooth transition effect
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Tools
        </Button>
        {/* <Button
          component={Link}
          to="/main/budgeting"
          sx={{
            color: isActive('/main/budgeting') ? '#00796b' : '#ffffff',
            textDecoration: 'none',
            margin: '0 12px',
            transition: 'color 0.3s ease',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Budgeting
        </Button>
        <Button
          component={Link}
          to="/main/investing"
          sx={{
            color: isActive('/main/investing') ? '#00796b' : '#ffffff',
            textDecoration: 'none',
            margin: '0 12px',
            transition: 'color 0.3s ease',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Investing
        </Button>
        <Button
          component={Link}
          to="/main/retirement"
          sx={{
            color: isActive('/main/retirement') ? '#00796b' : '#ffffff',
            textDecoration: 'none',
            margin: '0 12px',
            transition: 'color 0.3s ease',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Retirement
        </Button>
        <Button
          component={Link}
          to="/main/saving"
          sx={{
            color: isActive('/main/saving') ? '#00796b' : '#ffffff',
            textDecoration: 'none',
            margin: '0 12px',
            transition: 'color 0.3s ease',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Saving
        </Button> */}
        <Button
          component={Link}
          to="/main/games"
          sx={{
            color: isActive('/main/games') ? '#00796b' : '#ffffff',
            textDecoration: 'none',
            margin: '0 12px',
            transition: 'color 0.3s ease',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Quizzes
        </Button>

        {/* Profile Icon with Dropdown Menu */}
        <Box>
          <IconButton
            edge="end"
            sx={{ color: '#ffffff' }}
            aria-controls="profile-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
            <Link to='/main/account' style={{
              color: '#000000',
              textDecoration: 'none',
              margin: '0 12px',
              transition: 'color 0.3s ease',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}>
            Account
            </Link></MenuItem>
            <MenuItem onClick={handleMenuClose}>
            <Link to='/' style={{
              color: '#000000',
              textDecoration: 'none',
              margin: '0 12px',
              transition: 'color 0.3s ease',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}>
            Sign Out
            </Link></MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default MainNavbar;