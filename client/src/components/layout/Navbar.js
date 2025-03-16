import React, { Fragment, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    MenuItem,
    Stack,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Navbar = () => {
    const theme = useTheme();
    const [activeItem, setActiveItem] = useState('');
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAuthenticated = !!token;

    const pages = isAuthenticated ? [
        { title: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
        { title: 'Assessment', path: '/skill-assessment' },
        { title: 'Career', path: '/career-options' },
        { title: 'Day in Life', path: '/day-in-life' },
        { title: 'Connect', path: '/community' },
        { title: 'Forum', path: '/forum' },
        { title: 'Courses', path: '/marketplace' },
        { title: 'Ruhi', path: '/ruhi' }
    ] : [
        { title: 'Home', path: '/' },
        { title: 'Career', path: '/career-options' }
    ];

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNavigate = (path) => {
        navigate(path);
        handleCloseNavMenu();
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
        handleCloseUserMenu();
    };



    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                background: theme.palette.background.gradient,
                backdropFilter: 'blur(8px)',
                borderBottom: '1px solid',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                '& .MuiToolbar-root': {
                    minHeight: { xs: '56px', md: '64px' }
                }
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <SchoolIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 1,
                            display: { xs: 'none', md: 'flex' },
                            fontWeight: 700,
                            fontSize: '1.3rem',
                            color: 'white',
                            textDecoration: 'none',
                            fontFamily: theme.typography.fontFamily,
                            letterSpacing: '0.5px',
                        }}
                    >
                        PathFinder
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
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
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem 
                                    key={page.title} 
                                    onClick={() => handleNavigate(page.path)}
                                    sx={{ minHeight: '40px' }}
                                >
                                    {page.icon && (
                                        <Box component="span" sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                                            {page.icon}
                                        </Box>
                                    )}
                                    <Typography>{page.title}</Typography>
                                </MenuItem>
                            ))}
                            {!isAuthenticated && [
                                <MenuItem key="login" onClick={() => handleNavigate('/login')}>
                                    <LoginIcon sx={{ mr: 1 }} />
                                    <Typography>Login</Typography>
                                </MenuItem>,
                                <MenuItem key="register" onClick={() => handleNavigate('/register')}>
                                    <PersonAddIcon sx={{ mr: 1 }} />
                                    <Typography>Register</Typography>
                                </MenuItem>
                            ]}
                        </Menu>
                    </Box>

                    <SchoolIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        PathFinder
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 0.5 }}>
                        {pages.map((page) => (
                            <Button
                                key={page.title}
                                onClick={() => {
                                    handleNavigate(page.path);
                                    setActiveItem(page.title);
                                }}
                                sx={{
                                    minHeight: '36px',
                                    px: 1.5,
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '0.9rem',
                                    fontWeight: 500,
                                    borderRadius: '6px',
                                    backgroundColor: activeItem === page.title ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                        transform: 'translateY(-1px)'
                                    }
                                }}
                            >
                                {page.icon && (
                                    <Box component="span" sx={{ mr: 0.5, display: 'flex', alignItems: 'center' }}>
                                        {page.icon}
                                    </Box>
                                )}
                                {page.title}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {isAuthenticated ? (
                            <Fragment>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt={user.name || 'User'} src={user.avatar} />
                                </IconButton>
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
                                    <MenuItem onClick={handleLogout}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </Fragment>
                        ) : (
                            <Stack direction="row" spacing={1}>
                                <Button
                                    variant="contained"
                                    onClick={() => handleNavigate('/login')}
                                    sx={{
                                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                                        '&:hover': {
                                            bgcolor: 'rgba(255, 255, 255, 0.2)'
                                        }
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleNavigate('/register')}
                                    sx={{
                                        borderColor: 'rgba(255, 255, 255, 0.5)',
                                        color: 'white',
                                        '&:hover': {
                                            borderColor: 'white'
                                        }
                                    }}
                                >
                                    Register
                                </Button>
                            </Stack>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
