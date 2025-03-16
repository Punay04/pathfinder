import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Avatar,
    Box,
    TextField,
    InputAdornment,
    IconButton,
    Chip,
    Rating,
    Tab,
    Tabs,
    Skeleton,
} from '@mui/material';
import {
    LinkedIn as LinkedInIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
    Message as MessageIcon,
    VideoCall as VideoCallIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import axios from 'axios';

const MentorList = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentTab, setCurrentTab] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/users/mentors', {
                    headers: { 'x-auth-token': token }
                });
                setMentors(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching mentors:', error);
                setError('Failed to load mentors. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMentors();
    }, []);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    const filterMentors = () => {
        if (!searchQuery) return mentors;
        return mentors.filter(mentor =>
            mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            mentor.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    };

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
                <Typography color="error" variant="h6">{error}</Typography>
                <Button variant="contained" onClick={() => window.location.reload()} sx={{ mt: 2 }}>
                    Retry
                </Button>
            </Container>
        );
    }

    return (
        <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">
                {/* Header Section */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h3"
                        component={motion.h1}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        gutterBottom
                        sx={{ fontWeight: 'bold', color: 'primary.main' }}
                    >
                        Connect with Industry Experts
                    </Typography>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
                    >
                        Get personalized guidance from experienced professionals in your field
                    </Typography>
                </Box>

                {/* Search and Filter Section */}
                <Box sx={{ mb: 4 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                placeholder="Search by name or expertise..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton>
                                                <FilterIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>

                {/* Tabs */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
                    <Tabs value={currentTab} onChange={handleTabChange} centered>
                        <Tab label="All Mentors" />
                        <Tab label="Tech" />
                        <Tab label="Business" />
                        <Tab label="Design" />
                    </Tabs>
                </Box>

                {/* Mentors Grid */}
                <Grid container spacing={3}>
                    {loading ? (
                        // Loading skeletons
                        [...Array(6)].map((_, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', mb: 2 }}>
                                            <Skeleton variant="circular" width={80} height={80} />
                                            <Box sx={{ ml: 2, flex: 1 }}>
                                                <Skeleton variant="text" width="80%" />
                                                <Skeleton variant="text" width="60%" />
                                            </Box>
                                        </Box>
                                        <Skeleton variant="text" count={3} />
                                        <Box sx={{ mt: 2 }}>
                                            <Skeleton variant="rectangular" height={36} />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        filterMentors().map((mentor) => (
                            <Grid item xs={12} sm={6} md={4} key={mentor._id}>
                                <Card
                                    component={motion.div}
                                    whileHover={{ y: -5 }}
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Avatar
                                                sx={{ width: 80, height: 80, mr: 2 }}
                                            >
                                                {mentor.name[0]}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="h6" gutterBottom>
                                                    {mentor.name}
                                                </Typography>
                                                <Typography color="text.secondary" gutterBottom>
                                                    {mentor.role || 'Industry Expert'}
                                                </Typography>
                                                <Rating value={4.5} readOnly size="small" />
                                            </Box>
                                        </Box>

                                        <Typography variant="body2" sx={{ mb: 2 }}>
                                            {mentor.bio}
                                        </Typography>

                                        <Box sx={{ mb: 2 }}>
                                            {mentor.expertise.map((skill) => (
                                                <Chip
                                                    key={skill}
                                                    label={skill}
                                                    size="small"
                                                    sx={{ mr: 0.5, mb: 0.5 }}
                                                />
                                            ))}
                                        </Box>

                                        <Box sx={{ mt: 'auto' }}>
                                            <Button
                                                variant="contained"
                                                startIcon={<MessageIcon />}
                                                fullWidth
                                                sx={{ mb: 1 }}
                                            >
                                                Message
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                startIcon={<VideoCallIcon />}
                                                fullWidth
                                                sx={{ mb: 1 }}
                                            >
                                                Schedule Call
                                            </Button>
                                            {mentor.linkedin && (
                                                <Button
                                                    variant="text"
                                                    startIcon={<LinkedInIcon />}
                                                    fullWidth
                                                    href={mentor.linkedin}
                                                    target="_blank"
                                                >
                                                    View Profile
                                                </Button>
                                            )}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>
        </Box>
    );
};

export default MentorList;
