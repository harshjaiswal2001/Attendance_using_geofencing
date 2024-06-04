import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import AuthContext from '../AuthContext';

const logoutPages = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Login', path: '/login' },
];

const loginPages = [
    { title: 'Admin Dashboard', path: '/dashboard' },
    { title: 'Attendance', path: '/attendance' },
    { title: 'Subject Registration', path: '/subject' },
    { title: 'Student Registration', path: '/student' }
]

function Navbar() {

    const { isLoggedIn, logout } = React.useContext(AuthContext);

    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Geofencing Attendance System
                </Typography>

                <Box>
                    {!isLoggedIn && logoutPages.map((page) => (
                        <Button
                            key={page.title}
                            component={Link}
                            to={page.path}
                            color="inherit"
                        >
                            {page.title}
                        </Button>
                    ))}
                    {isLoggedIn && loginPages.map((page) => (
                        <Button
                            key={page.title}
                            component={Link}
                            to={page.path}
                            color="inherit"
                        >
                            {page.title}
                        </Button>
                    ))}

                    {isLoggedIn &&
                        <Button
                            component={Link}
                            to="/login"
                            color="inherit"
                        >
                            Login
                        </Button>
                    }
                </Box>

                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleOpenNavMenu}
                    sx={{ display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                >
                    {!isLoggedIn && logoutPages.map((page) => (
                        <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                            <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                                {page.title}
                            </Link>
                        </MenuItem>
                    ))}
                    {isLoggedIn && loginPages.map((page) => (
                        <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                            <Link to={page.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                                {page.title}
                            </Link>
                        </MenuItem>
                    ))}
                    {isLoggedIn &&
                        <MenuItem onClick={handleCloseNavMenu}>
                            <Button onClick={logout} style={{ textDecoration: 'none', color: 'inherit' }}>
                                Logout
                            </Button>
                        </MenuItem>
                    }
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
