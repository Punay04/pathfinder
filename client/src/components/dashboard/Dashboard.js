import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    Button,
    TextField,
    Stack,
    CircularProgress,
    Alert,
    IconButton,
    Divider,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    ListItemAvatar,
    LinearProgress,
    Chip,
} from '@mui/material';
import {
    Edit as EditIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
    Work as WorkIcon,
    School as SchoolIcon,
    Logout as LogoutIcon,
    LocationOn as LocationIcon,
    Email as EmailIcon,
    LinkedIn as LinkedInIcon,
    GitHub as GitHubIcon,
    Bookmark as BookmarkIcon,
    TrendingUp as TrendingUpIcon,
    Assignment as AssignmentIcon,
    People as PeopleIcon,
    Star as StarIcon,
} from '@mui/icons-material';

const Dashboard = () => {
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userProfile, setUserProfile] = useState({});
    const [editedProfile, setEditedProfile] = useState({});
    const [error, setError] = useState('');
    const [skills, setSkills] = useState([
        'React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'Python'
    ]);
    const [recommendations, setRecommendations] = useState([
        {
            title: 'Software Engineer',
            company: 'Tech Corp',
            location: 'Remote',
            match: 95,
        },
        {
            title: 'Full Stack Developer',
            company: 'Innovation Labs',
            location: 'Delhi, India',
            match: 88,
        },
    ]);
    const [courses, setCourses] = useState([
        {
            title: 'Advanced Web Development',
            provider: 'Coursera',
            progress: 75,
            enrolled: '2024-02-15',
        },
        {
            title: 'Machine Learning Fundamentals',
            provider: 'edX',
            progress: 45,
            enrolled: '2024-03-01',
        },
    ]);
    const [connections, setConnections] = useState({
        total: 500,
        views: 50,
        newConnections: 15
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        loadUserProfile();
    }, [navigate]);

    const loadUserProfile = async () => {
        setIsLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/user/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to load profile');
            }
            
            const userData = await response.json();
            const defaultProfile = {
                ...userData,
                role: userData.role || 'Software Engineer',
                education: userData.education || 'B.Tech Computer Science',
                location: userData.location || 'Delhi, India',
                email: userData.email || 'user@example.com',
                linkedin: userData.linkedin || '',
                github: userData.github || '',
                bio: userData.bio || 'Passionate software engineer with expertise in full-stack development and machine learning.',
                interests: userData.interests || ['Web Development', 'Machine Learning', 'AI'],
                experience: userData.experience || [
                    {
                        title: 'Software Engineer Intern',
                        company: 'Tech Solutions Inc.',
                        duration: 'Jun 2023 - Present',
                        description: 'Working on full-stack web development using MERN stack.'
                    }
                ]
            };
            setUserProfile(defaultProfile);
            setEditedProfile(defaultProfile);
        } catch (error) {
            console.error('Error loading profile:', error);
            setError('Failed to load profile. Please try again.');
        }
        setIsLoading(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setEditedProfile(userProfile);
    };

    const handleSaveClick = async () => {
        setIsLoading(true);
        setError('');
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(editedProfile)
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            setUserProfile(editedProfile);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile. Please try again.');
        }
        setIsLoading(false);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setEditedProfile(userProfile);
        setError('');
    };

    const handleProfileChange = (field) => (event) => {
        setEditedProfile(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <Box sx={{ bgcolor: '#f3f2ef', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <Grid container spacing={3}>
                    {/* Left Column */}
                    <Grid item xs={12} md={8}>
                        {/* Profile Card */}
                        <Card sx={{ mb: 3, borderRadius: 2 }}>
                            <Box sx={{ 
                                height: 200, 
                                bgcolor: 'primary.main', 
                                position: 'relative',
                                backgroundImage: 'linear-gradient(to right, #1976d2, #1565c0)'
                            }} />
                            <CardContent sx={{ position: 'relative', pt: 0 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        startIcon={<LogoutIcon />}
                                        onClick={handleLogout}
                                        size="small"
                                    >
                                        Logout
                                    </Button>
                                </Box>
                                {isLoading ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <CircularProgress sx={{ my: 4 }} />
                                    </Box>
                                ) : (
                                    <Box>
                                        <Avatar
                                            sx={{
                                                width: 150,
                                                height: 150,
                                                border: '4px solid white',
                                                position: 'absolute',
                                                top: -75,
                                                left: 32,
                                                fontSize: '3rem',
                                                bgcolor: 'primary.dark',
                                            }}
                                        >
                                            {userProfile.name?.[0] || 'U'}
                                        </Avatar>
                                        {isEditing ? (
                                            <Box sx={{ ml: '200px', mb: 2 }}>
                                                <Stack spacing={3}>
                                                    <TextField
                                                        label="Name"
                                                        value={editedProfile.name || ''}
                                                        onChange={handleProfileChange('name')}
                                                        fullWidth
                                                        variant="outlined"
                                                    />
                                                    <TextField
                                                        label="Role"
                                                        value={editedProfile.role || ''}
                                                        onChange={handleProfileChange('role')}
                                                        fullWidth
                                                        variant="outlined"
                                                    />
                                                    <TextField
                                                        label="Bio"
                                                        value={editedProfile.bio || ''}
                                                        onChange={handleProfileChange('bio')}
                                                        fullWidth
                                                        multiline
                                                        rows={4}
                                                        variant="outlined"
                                                    />
                                                    <TextField
                                                        label="Location"
                                                        value={editedProfile.location || ''}
                                                        onChange={handleProfileChange('location')}
                                                        fullWidth
                                                        variant="outlined"
                                                    />
                                                    <TextField
                                                        label="Email"
                                                        value={editedProfile.email || ''}
                                                        onChange={handleProfileChange('email')}
                                                        fullWidth
                                                        variant="outlined"
                                                        type="email"
                                                    />
                                                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                                                        <Button
                                                            variant="outlined"
                                                            onClick={handleCancelEdit}
                                                            startIcon={<CancelIcon />}
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            onClick={handleSaveClick}
                                                            startIcon={<SaveIcon />}
                                                        >
                                                            Save Changes
                                                        </Button>
                                                    </Stack>
                                                </Stack>
                                            </Box>
                                        ) : (
                                            <Box sx={{ ml: '200px', mb: 2 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                                    <Box>
                                                        <Typography variant="h4" gutterBottom>
                                                            {userProfile.name || 'Welcome User'}
                                                        </Typography>
                                                        <Typography variant="h6" color="text.secondary">
                                                            {userProfile.role}
                                                        </Typography>
                                                    </Box>
                                                    <Button
                                                        variant="contained"
                                                        onClick={handleEditClick}
                                                        startIcon={<EditIcon />}
                                                    >
                                                        Edit Profile
                                                    </Button>
                                                </Box>
                                                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                                        <Typography color="text.secondary">
                                                            {userProfile.location}
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                                                        <Typography color="text.secondary">
                                                            {userProfile.email}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                                                    <IconButton color="primary" size="small">
                                                        <LinkedInIcon />
                                                    </IconButton>
                                                    <IconButton color="primary" size="small">
                                                        <GitHubIcon />
                                                    </IconButton>
                                                </Stack>
                                                <Divider sx={{ my: 2 }} />
                                                <Typography variant="body1" color="text.secondary" paragraph>
                                                    {userProfile.bio}
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                )}
                            </CardContent>
                        </Card>

                        {/* Skills & Endorsements */}
                        <Card sx={{ mb: 3, borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Skills & Endorsements
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                                    {skills.map((skill) => (
                                        <Chip
                                            key={skill}
                                            label={skill}
                                            variant="outlined"
                                            color="primary"
                                            icon={<StarIcon />}
                                        />
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>

                        {/* Education */}
                        <Card sx={{ mb: 3, borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Education
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <SchoolIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={userProfile.education}
                                            secondary="2021 - 2025"
                                        />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right Column */}
                    <Grid item xs={12} md={4}>
                        {/* Job Recommendations */}
                        <Card sx={{ mb: 3, borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Job Recommendations
                                </Typography>
                                <List>
                                    {recommendations.map((job, index) => (
                                        <React.Fragment key={index}>
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                                                        <WorkIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={job.title}
                                                    secondary={
                                                        <>
                                                            <Typography component="span" variant="body2" color="text.primary">
                                                                {job.company}
                                                            </Typography>
                                                            {` — ${job.location}`}
                                                            <Box sx={{ mt: 1 }}>
                                                                <Chip
                                                                    size="small"
                                                                    label={`${job.match}% Match`}
                                                                    color="success"
                                                                />
                                                            </Box>
                                                        </>
                                                    }
                                                />
                                                <IconButton size="small">
                                                    <BookmarkIcon />
                                                </IconButton>
                                            </ListItem>
                                            {index < recommendations.length - 1 && <Divider variant="inset" component="li" />}
                                        </React.Fragment>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>

                        {/* Learning Progress */}
                        <Card sx={{ mb: 3, borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Learning Progress
                                </Typography>
                                <List>
                                    {courses.map((course, index) => (
                                        <React.Fragment key={index}>
                                            <ListItem>
                                                <ListItemIcon>
                                                    <SchoolIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={course.title}
                                                    secondary={
                                                        <Box sx={{ mt: 1 }}>
                                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                                {course.provider}
                                                            </Typography>
                                                            <LinearProgress
                                                                variant="determinate"
                                                                value={course.progress}
                                                                sx={{ height: 6, borderRadius: 3 }}
                                                            />
                                                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                                                {course.progress}% Complete
                                                            </Typography>
                                                        </Box>
                                                    }
                                                />
                                            </ListItem>
                                            {index < courses.length - 1 && <Divider variant="inset" component="li" />}
                                        </React.Fragment>
                                    ))}
                                </List>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<SchoolIcon />}
                                    sx={{ mt: 2 }}
                                >
                                    View All Courses
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Network Stats */}
                        <Card sx={{ borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Your Network
                                </Typography>
                                <List>
                                    <ListItem>
                                        <ListItemIcon>
                                            <PeopleIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={`${connections.total}+ Connections`}
                                            secondary="Grow your network"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemIcon>
                                            <TrendingUpIcon color="primary" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={`${connections.views} Profile views`}
                                            secondary="Last 90 days"
                                        />
                                    </ListItem>
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard;
