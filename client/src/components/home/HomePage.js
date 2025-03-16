import React from 'react';
import { Box, Container, Typography, Button, Grid, Card, CardContent, Fab, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import WorkIcon from '@mui/icons-material/Work';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BusinessIcon from '@mui/icons-material/Business';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionCard = motion(Card);

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const HomePage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;

    const stats = [
        { number: '10,000+', label: 'Active Members' },
        { number: '500+', label: 'Expert Mentors' },
        { number: '1,000+', label: 'Success Stories' },
        { number: '50+', label: 'Partner Companies' },
    ];

    const features = [
        {
            icon: <SchoolIcon sx={{ fontSize: 40 }} />,
            title: 'Career Guidance',
            description: 'Get personalized career advice from top professionals in India. Our expert mentors from IITs, IIMs, and leading companies help you make informed decisions.'
        },
        {
            icon: <GroupIcon sx={{ fontSize: 40 }} />,
            title: 'Mentor Community',
            description: 'Connect with experienced professionals from companies like TCS, Infosys, and startups. Learn from their journey and get insider tips for success.'
        },
        {
            icon: <WorkIcon sx={{ fontSize: 40 }} />,
            title: 'Career Options',
            description: 'Explore trending career paths in India, from IT and Data Science to Digital Marketing and Entrepreneurship. Stay updated with industry demands.'
        },
        {
            icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
            title: 'Skill Development',
            description: 'Access curated resources and roadmaps for in-demand skills. Get guidance on certification courses and training programs recognized in India.'
        },
        {
            icon: <LightbulbIcon sx={{ fontSize: 40 }} />,
            title: 'Industry Insights',
            description: 'Stay ahead with latest trends in Indian job market. Get regular updates on emerging technologies and growing sectors.'
        },
        {
            icon: <BusinessIcon sx={{ fontSize: 40 }} />,
            title: 'Company Connect',
            description: 'Engage with recruiters from top Indian companies. Get preparation tips for interviews and placement processes.'
        }
    ];

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* Hero Section */}
            <Box
                component={motion.div}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                sx={{
                    pt: 15,
                    pb: 6,
                    background: 'linear-gradient(120deg, #FFFFFF 0%, #F0F9FF 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 4px 20px rgba(37, 99, 235, 0.1)',
                    borderBottom: '1px solid rgba(37, 99, 235, 0.1)'
                }}
            >
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography
                                component="h1"
                                variant="h2"
                                color="primary.dark"
                                gutterBottom
                                fontWeight="bold"
                                sx={{
                                    background: 'linear-gradient(120deg, #1E40AF 0%, #2563EB 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Shape Your Future
                            </Typography>
                            <Typography
                                variant="h5"
                                color="text.secondary"
                                paragraph
                                sx={{ mb: 4, maxWidth: '600px' }}
                            >
                                Connect with mentors, explore career paths, and make informed decisions
                                about your professional journey. Our platform is designed to help you navigate
                                the complex world of career development with personalized guidance and support.
                            </Typography>
                            <Box sx={{ mt: 4 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    onClick={() => navigate('/register')}
                                    sx={{
                                        mr: 2,
                                        px: 4,
                                        py: 1.5,
                                        fontWeight: 600,
                                        boxShadow: '0 4px 14px rgba(37, 99, 235, 0.2)',
                                        '&:hover': {
                                            boxShadow: '0 6px 20px rgba(37, 99, 235, 0.3)'
                                        }
                                    }}
                                >
                                    Get Started
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="large"
                                    onClick={() => navigate('/login')}
                                    sx={{
                                        px: 4,
                                        py: 1.5,
                                        fontWeight: 600,
                                        borderWidth: 2,
                                        '&:hover': {
                                            borderWidth: 2
                                        }
                                    }}
                                >
                                    Sign In
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* About Section */}
            <Container sx={{ py: 8 }} maxWidth="lg">
                <Typography
                    component={motion.h2}
                    variant="h3"
                    gutterBottom
                    textAlign="center"
                    sx={{ mb: 6, fontWeight: 'bold', color: 'primary.main' }}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    About Our Platform
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>
                            Your Career Development Partner
                        </Typography>
                        <Typography variant="body1" paragraph>
                            We're dedicated to helping students and professionals in India navigate their career paths with confidence. Our platform connects you with experienced mentors, provides valuable resources, and offers personalized guidance to help you achieve your professional goals.
                        </Typography>
                        <Typography variant="h6" color="primary" gutterBottom sx={{ mt: 4 }}>
                            Key Features
                        </Typography>
                        <ul>
                            <li>
                                <Typography variant="body1">
                                    <strong>Mentor Connect:</strong> Access expert mentors from top companies and institutions
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1">
                                    <strong>Resource Hub:</strong> Curated learning materials and career guides
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1">
                                    <strong>Community Support:</strong> Engage with peers and professionals
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1">
                                    <strong>AI Assistance:</strong> Our Ruhi AI assistant provides personalized career guidance
                                </Typography>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>
                            Meet Ruhi - Your AI Career Assistant
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Ruhi is our advanced AI assistant designed to help you make informed career decisions. With Ruhi, you can:
                        </Typography>
                        <ul>
                            <li>
                                <Typography variant="body1">
                                    Get personalized career recommendations based on your interests and skills
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1">
                                    Explore trending career paths and industry demands
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1">
                                    Receive guidance on skill development and certification paths
                                </Typography>
                            </li>
                            <li>
                                <Typography variant="body1">
                                    Connect with relevant mentors and resources
                                </Typography>
                            </li>
                        </ul>
                        <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                            Ready to start your career journey? Sign up now to access Ruhi and our full suite of career development tools.
                        </Typography>
                    </Grid>
                </Grid>
            </Container>



            {/* Stats Section */}
            <Container sx={{ py: 6 }} maxWidth="lg">
                <Grid container spacing={3} justifyContent="center">
                    {stats.map((stat, index) => (
                        <Grid item key={index} xs={6} md={3}>
                            <Card
                                component={motion.div}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                sx={{
                                    textAlign: 'center',
                                    py: 3,
                                    backgroundColor: 'background.paper',
                                    '&:hover': {
                                        backgroundColor: 'background.paper',
                                        transform: 'translateY(-4px)',
                                        transition: 'transform 0.3s ease-in-out',
                                    },
                                }}
                            >
                                <CardContent>
                                    <Typography
                                        variant="h4"
                                        color="primary"
                                        gutterBottom
                                        sx={{ fontWeight: 'bold' }}
                                    >
                                        {stat.number}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{ fontWeight: 500 }}
                                    >
                                        {stat.label}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* Features Section */}
            <Container sx={{ py: 8 }} maxWidth="lg">
                <Typography
                    component={motion.h2}
                    variant="h3"
                    gutterBottom
                    textAlign="center"
                    sx={{ mb: 6, fontWeight: 'bold', color: 'primary.main' }}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    Why Choose Our Platform?
                </Typography>
                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item key={index} xs={12} md={4}>
                            <Card
                                component={motion.div}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    backgroundColor: 'background.paper',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        transition: 'transform 0.3s ease-in-out',
                                        boxShadow: (theme) => `0 8px 24px ${theme.palette.primary.main}20`,
                                    },
                                }}
                            >
                                <CardContent>
                                    <Box
                                        sx={{
                                            color: 'primary.main',
                                            mb: 2,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            '& svg': { fontSize: 48 }
                                        }}
                                    >
                                        {feature.icon}
                                    </Box>
                                    <Typography
                                        variant="h5"
                                        component="h3"
                                        gutterBottom
                                        align="center"
                                        sx={{ fontWeight: 600, color: 'primary.light' }}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography
                                        color="text.secondary"
                                        align="center"
                                        sx={{ lineHeight: 1.6 }}
                                    >
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default HomePage;
