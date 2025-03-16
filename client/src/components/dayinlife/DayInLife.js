import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    TextField,
    MenuItem,
    Grid,
    Card,
    CardContent,
    CardMedia,
    InputAdornment,
    CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { motion } from 'framer-motion';

const careerOptions = [
    'Software Engineer',
    'Data Scientist',
    'UX Designer',
    'Product Manager',
    'Digital Marketing',
    'Financial Analyst',
    'Healthcare Professional',
    'Teacher',
    'Entrepreneur',
    'Architect'
];

const DayInLife = () => {
    const navigate = useNavigate();
    const [selectedCareer, setSelectedCareer] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const API_KEY = 'AIzaSyB0MFTxpg4ziwCAETDa9F4_Nfl2dkCR-zc'; // Replace with your actual API key

    const fetchVideos = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=day in the life of ${query}&type=video&key=${API_KEY}`
            );
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error.message);
            }

            setVideos(data.items);
        } catch (err) {
            setError('Failed to fetch videos. Please try again later.');
            console.error('Error fetching videos:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectedCareer) {
            fetchVideos(selectedCareer);
        }
    }, [selectedCareer]);

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchQuery.trim()) {
            fetchVideos(searchQuery);
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', pt: 8, pb: 6, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                <Typography
                    component={motion.h1}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    variant="h2"
                    align="center"
                    gutterBottom
                    sx={{ 
                        fontWeight: 700,
                        color: 'primary.main',
                        mb: 4
                    }}
                >
                    A Day in the Life of...
                </Typography>

                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    sx={{ 
                        maxWidth: 600,
                        mx: 'auto',
                        mb: 6
                    }}
                >
                    <form onSubmit={handleSearch}>
                        <TextField
                            select
                            fullWidth
                            label="Select Career"
                            value={selectedCareer}
                            onChange={(e) => setSelectedCareer(e.target.value)}
                            sx={{ mb: 2 }}
                        >
                            {careerOptions.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            fullWidth
                            label="Search Any Career"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </form>
                </Box>

                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                        <CircularProgress />
                    </Box>
                )}

                {error && (
                    <Typography color="error" align="center" sx={{ my: 4 }}>
                        {error}
                    </Typography>
                )}

                <Grid container spacing={3}>
                    {videos.map((video) => (
                        <Grid item xs={12} sm={6} md={4} key={video.id.videoId}>
                            <Card
                                component={motion.div}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.3 }}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    '&:hover': {
                                        boxShadow: 6
                                    }
                                }}
                            >
                                <CardMedia
                                    component="iframe"
                                    height="200"
                                    src={`https://www.youtube.com/embed/${video.id.videoId}`}
                                    title={video.snippet.title}
                                    sx={{ border: 0 }}
                                />
                                <CardContent>
                                    <Typography variant="h6" gutterBottom noWrap>
                                        {video.snippet.title}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary"
                                        sx={{
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}
                                    >
                                        {video.snippet.description}
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

export default DayInLife;
