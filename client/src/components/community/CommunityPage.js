import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    TextField,
    Stack,
    Chip,
    Avatar,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    InputAdornment,
    IconButton,
    Rating,
} from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MessageIcon from '@mui/icons-material/Message';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import SendIcon from '@mui/icons-material/Send';
import EventIcon from '@mui/icons-material/Event';
import axios from 'axios';

const CommunityPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
    }, [isAuthenticated, navigate]);

    const [selectedExpertise, setSelectedExpertise] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showContactDialog, setShowContactDialog] = useState(false);
    const [selectedMentor, setSelectedMentor] = useState(null);
    const [contactType, setContactType] = useState('message');
    const [error, setError] = useState(null);

    const expertiseCategories = [
        'All',
        'React',
        'Node.js',
        'System Design',
        'Product Strategy',
        'Machine Learning',
        'UX Design',
        'Cloud Architecture',
        'Team Leadership'
    ];

    const handleExpertiseChange = (expertise) => {
        setSelectedExpertise(expertise);
    };

    const handleContactClick = async (mentor, type) => {
        setSelectedMentor(mentor);
        setContactType(type);
        setShowContactDialog(true);
    };

    const handleCloseDialog = () => {
        setShowContactDialog(false);
        setSelectedMentor(null);
    };

    const handleSubmitContact = async () => {
        try {
            // TODO: Implement API call to submit contact request
            // const response = await axios.post('http://localhost:5000/api/mentors/contact', {
            //     mentorId: selectedMentor._id,
            //     type: contactType,
            //     message: messageText // For message type
            //     timeSlot: selectedTimeSlot // For call type
            // });
            handleCloseDialog();
            // Show success message
        } catch (error) {
            console.error('Error submitting contact request:', error);
            // Show error message
        }
    };

    useEffect(() => {
        // Fetch mentors from the backend
        const fetchMentors = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/mentors');
                setMentors(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching mentors:', error);
                // Fallback to sample data in development
                const sampleMentors = [
                    {
                        _id: '1',
                        name: 'Dr. Sarah Johnson',
                        role: 'Senior Software Engineer',
                        bio: 'Experienced software engineer with 10+ years in full-stack development. Passionate about mentoring and helping others grow in their tech careers.',
                        expertise: ['React', 'Node.js', 'System Design'],
                        rating: 4.8
                    },
                    {
                        _id: '2',
                        name: 'Raj Patel',
                        role: 'Product Manager',
                        bio: 'Product leader with experience at top tech companies. Helps professionals transition into product management roles.',
                        expertise: ['Product Strategy', 'Team Leadership', 'System Design'],
                        rating: 4.9
                    },
                    {
                        _id: '3',
                        name: 'Priya Sharma',
                        role: 'Data Science Lead',
                        bio: 'Data science expert specializing in AI/ML. Guides aspiring data scientists in building successful careers.',
                        expertise: ['Machine Learning', 'System Design', 'Team Leadership'],
                        rating: 4.7
                    },
                    {
                        _id: '4',
                        name: 'Alex Chen',
                        role: 'UX Design Manager',
                        bio: 'Design leader passionate about creating user-centered experiences. Mentors designers in improving their craft.',
                        expertise: ['UX Design', 'Product Strategy', 'Team Leadership'],
                        rating: 4.9
                    },
                    {
                        _id: '5',
                        name: 'Maya Reddy',
                        role: 'Cloud Architect',
                        bio: 'AWS certified architect helping professionals master cloud technologies and advance their careers.',
                        expertise: ['Cloud Architecture', 'System Design', 'Node.js'],
                        rating: 4.8
                    },
                    {
                        _id: '6',
                        name: 'James Wilson',
                        role: 'Tech Lead',
                        bio: 'Experienced tech lead specializing in scalable architectures and team leadership.',
                        expertise: ['System Design', 'Team Leadership', 'React'],
                        rating: 4.7
                    }
                ];
                setMentors(sampleMentors);
            } finally {
                setLoading(false);
            }
        };

        fetchMentors();
    }, []);

    const filterMentors = () => {
        let filtered = mentors;

        // Filter by expertise
        if (selectedExpertise !== 'All') {
            filtered = filtered.filter(mentor => 
                mentor.expertise.includes(selectedExpertise)
            );
        }

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(mentor =>
                mentor.name.toLowerCase().includes(query) ||
                mentor.role.toLowerCase().includes(query) ||
                mentor.bio.toLowerCase().includes(query) ||
                mentor.expertise.some(skill => skill.toLowerCase().includes(query))
            );
        }

        return filtered;
    };

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h6">Loading...</Typography>
            </Container>
        );
    }

    if (!mentors.length) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="h6">No mentors found.</Typography>
            </Container>
        );
    }

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
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
                    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{
                                flexWrap: 'wrap',
                                gap: 1,
                                justifyContent: 'center'
                            }}
                        >
                            {expertiseCategories.map((category) => (
                                <Chip
                                    key={category}
                                    label={category}
                                    onClick={() => handleExpertiseChange(category)}
                                    color={selectedExpertise === category ? 'primary' : 'default'}
                                    sx={{
                                        '&:hover': {
                                            bgcolor: 'primary.dark',
                                            color: 'white'
                                        }
                                    }}
                                />
                            ))}
                        </Stack>
                    </Box>
                    <Grid container spacing={2} alignItems="center" justifyContent="center">
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
                                                <FilterListIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>

                {/* Mentors Grid */}
                <Grid container spacing={3}>
                    {filterMentors().map((mentor) => (
                        <Grid item xs={12} sm={6} md={4} key={mentor._id}>
                            <Card
                                component={motion.div}
                                whileHover={{ scale: 1.02 }}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    boxShadow: 2,
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                        borderColor: 'primary.main'
                                    }
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Avatar
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                mr: 2,
                                                bgcolor: 'primary.main'
                                            }}
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
                                            <Rating value={mentor.rating} readOnly size="small" precision={0.1} />
                                        </Box>
                                    </Box>

                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        {mentor.bio}
                                    </Typography>

                                    <Box sx={{ mb: 2 }}>
                                        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                                            {mentor.expertise.map((skill, index) => (
                                                <Chip
                                                    component={motion.div}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    key={index}
                                                    label={skill}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: 'primary.light',
                                                        color: 'white',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s ease-in-out',
                                                        '&:hover': {
                                                            boxShadow: 2
                                                        }
                                                    }}
                                                />
                                            ))}
                                        </Stack>
                                    </Box>

                                    <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                                        <Button
                                            variant="contained"
                                            startIcon={<MessageIcon />}
                                            fullWidth
                                            sx={{
                                                transition: 'all 0.2s ease-in-out',
                                                flex: 1,
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: 2,
                                                    bgcolor: 'primary.main',
                                                    color: 'white'
                                                }
                                            }}
                                            onClick={() => handleContactClick(mentor, 'message')}
                                        >
                                            Message
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            startIcon={<VideoCallIcon />}
                                            fullWidth
                                            component={motion.button}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            sx={{
                                                transition: 'all 0.2s ease-in-out',
                                                flex: 1,
                                                '&:hover': {
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: 2,
                                                    bgcolor: 'primary.main',
                                                    color: 'white'
                                                }
                                            }}
                                            onClick={() => handleContactClick(mentor, 'call')}
                                        >
                                            Call
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Dialog
                open={showContactDialog}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        bgcolor: 'background.paper',
                        backgroundImage: 'none'
                    }
                }}
            >
                <DialogTitle>
                    {contactType === 'message' ? 'Send Message' : 'Schedule a Call'} with {selectedMentor?.name}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ pt: 2 }}>
                        {contactType === 'message' ? (
                            <TextField
                                multiline
                                rows={4}
                                fullWidth
                                label="Your Message"
                                placeholder="Introduce yourself and explain what you'd like to discuss..."
                                variant="outlined"
                                sx={{
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        transform: 'translateY(-2px)',
                                        boxShadow: 2
                                    }
                                }}
                            />
                        ) : (
                            <>
                                <Typography variant="subtitle1" gutterBottom>
                                    Select a time slot for your call:
                                </Typography>
                                <Grid container spacing={2}>
                                    {['10:00 AM', '2:00 PM', '4:00 PM'].map((time) => (
                                        <Grid item xs={12} sm={4} key={time}>
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                component={motion.button}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                sx={{
                                                    transition: 'all 0.2s ease-in-out',
                                                    py: 2,
                                                    '&:hover': {
                                                        transform: 'translateY(-2px)',
                                                        boxShadow: 2,
                                                        bgcolor: 'primary.main',
                                                        color: 'white'
                                                    }
                                                }}
                                            >
                                                {time}
                                            </Button>
                                        </Grid>
                                    ))}
                                </Grid>
                            </>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="inherit">
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmitContact}
                        startIcon={contactType === 'message' ? <SendIcon /> : <EventIcon />}
                    >
                        {contactType === 'message' ? 'Send Message' : 'Schedule Call'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CommunityPage;
