import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    TextField,
    Avatar,
    Chip,
    Divider,
    Grid,
    IconButton,
    Paper,
    Fade,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const ForumPage = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
    }, [isAuthenticated, navigate]);

    const [categories] = useState([
        { name: 'Career Guidance', icon: '🎯' },
        { name: 'Job Opportunities', icon: '💼' },
        { name: 'Skill Development', icon: '📚' },
        { name: 'Interview Prep', icon: '🎤' },
        { name: 'Resume Building', icon: '📝' },
        { name: 'Networking', icon: '🤝' }
    ]);

    const [selectedCategory, setSelectedCategory] = useState('All');

    const [posts, setPosts] = useState([
        {
            id: 1,
            author: 'Priya Sharma',
            role: 'Software Engineer at TCS',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
            content: 'What skills should I focus on to transition into AI/ML field from web development? I have 2 years of experience in MERN stack development and want to pivot into machine learning. Any suggestions for courses or learning paths that are particularly relevant for the Indian job market?',
            likes: 24,
            comments: 8,
            category: 'Skill Development',
            tags: ['Career Transition', 'AI/ML', 'Skill Development', 'Indian Tech'],
            time: '2 hours ago',
            responses: [
                {
                    author: 'Amit Kumar',
                    role: 'ML Engineer at Microsoft',
                    content: 'Start with Python and statistics fundamentals. Then move to ML libraries like scikit-learn and TensorFlow. IIT Madras and IIIT Bangalore offer great online courses in AI/ML.'
                }
            ]
        },
        {
            id: 2,
            author: 'Rahul Verma',
            role: 'Product Manager at Flipkart',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
            content: 'Looking for advice on preparing for product management interviews in Indian startups. Currently working in a corporate role, aiming to transition to fast-paced startup environment. Any experienced PMs here who can guide on the interview process?',
            likes: 15,
            comments: 5,
            category: 'Interview Prep',
            tags: ['Product Management', 'Interview Prep', 'Startups', 'Career Switch'],
            time: '4 hours ago',
            responses: [
                {
                    author: 'Neha Gupta',
                    role: 'Senior PM at Razorpay',
                    content: 'Focus on case studies from Indian startups. Understand the unique challenges of Indian market. Practice product metrics and A/B testing scenarios.'
                }
            ]
        },
        {
            id: 3,
            author: 'Karthik Rajan',
            role: 'Data Scientist at Amazon',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
            content: 'For those interested in data science careers in India, here are some insights from my 5 years of experience: 1) Strong foundation in statistics is crucial 2) Python/R proficiency is a must 3) Real project experience matters more than certificates. Happy to mentor aspiring data scientists!',
            likes: 42,
            comments: 15,
            category: 'Career Guidance',
            tags: ['Data Science', 'Career Advice', 'Mentorship', 'Indian Tech'],
            time: '6 hours ago',
            responses: [
                {
                    author: 'Sneha Patel',
                    role: 'Student at IIT Bombay',
                    content: 'Thank you for offering to mentor! Would love to learn about the data science projects at Amazon India.'
                }
            ]
        },
        {
            id: 4,
            author: 'Ananya Singh',
            role: 'UI/UX Designer at Swiggy',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80',
            content: 'Looking to connect with other UX designers in Bangalore! Working on some interesting projects in the food-tech space and would love to organize a meetup to discuss design challenges specific to Indian users.',
            likes: 28,
            comments: 12,
            category: 'Networking',
            tags: ['UX Design', 'Networking', 'Bangalore', 'Food Tech'],
            time: '8 hours ago',
            responses: [
                {
                    author: 'Rohan Mehta',
                    role: 'Design Lead at Zomato',
                    content: 'Great initiative! Would love to join and share our experiences designing for diverse Indian user base.'
                }
            ]
        },
        {
            id: 5,
            author: 'Rajesh Kumar',
            role: 'HR Manager at Infosys',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80',
            content: 'Hiring alert! Infosys is looking for fresh graduates and experienced professionals in Cloud Computing, DevOps, and Full Stack Development roles. Location: Bangalore, Pune, Hyderabad. DM for referrals.',
            likes: 156,
            comments: 45,
            category: 'Job Opportunities',
            tags: ['Job Opening', 'IT Jobs', 'Infosys', 'Freshers'],
            time: '12 hours ago',
            responses: [
                {
                    author: 'Arjun Reddy',
                    role: 'Technical Lead at Infosys',
                    content: 'Great opportunity for freshers! We offer excellent training programs and career growth. Feel free to ask any questions about the roles.'
                }
            ]
        },
        {
            id: 6,
            author: 'Meera Patel',
            role: 'Career Coach',
            avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100&q=80',
            content: 'Resume Writing Workshop Alert! 🎯 Join me this Saturday for a free online session on crafting an ATS-friendly resume. Topics: Keywords optimization, formatting best practices, and common mistakes to avoid. Limited slots available!',
            likes: 89,
            comments: 23,
            category: 'Resume Building',
            tags: ['Resume Tips', 'Workshop', 'Career Development', 'ATS'],
            time: '1 day ago',
            responses: [
                {
                    author: 'Vikram Singh',
                    role: 'Recent Graduate',
                    content: 'This is exactly what I needed! How can I register for the workshop?'
                },
                {
                    author: 'Meera Patel',
                    role: 'Career Coach',
                    content: 'Hi Vikram! You can register through the link in my bio. Looking forward to helping you create a stellar resume!'
                }
            ]
        }
    ]);

    const [newPost, setNewPost] = useState('');

    const handleNewPost = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        if (newPost.trim()) {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            setPosts([
                {
                    id: posts.length + 1,
                    author: user.name || 'Anonymous',
                    role: user.role || 'Community Member',
                    avatar: '/avatars/default.jpg',
                    content: newPost,
                    likes: 0,
                    comments: 0,
                    tags: [],
                    time: 'Just now'
                },
                ...posts
            ]);
            setNewPost('');
        }
    };

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="md">
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography
                        variant="h4"
                        component={motion.h1}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        gutterBottom
                        sx={{ color: 'primary.main', fontWeight: 'bold' }}
                    >
                        Community Discussion Forum
                    </Typography>
                    <Typography
                        variant="h6"
                        component={motion.p}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        color="text.secondary"
                        sx={{ maxWidth: '600px', mx: 'auto', mb: 4 }}
                    >
                        Connect with professionals, share experiences, and get career guidance from experts across India
                    </Typography>
                    
                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        sx={{
                            display: 'flex',
                            gap: 2,
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            mb: 4
                        }}
                    >
                        <Chip
                            label="All"
                            color={selectedCategory === 'All' ? 'primary' : 'default'}
                            onClick={() => setSelectedCategory('All')}
                            sx={{ px: 2 }}
                        />
                        {categories.map((category) => (
                            <Chip
                                key={category.name}
                                label={`${category.icon} ${category.name}`}
                                color={selectedCategory === category.name ? 'primary' : 'default'}
                                onClick={() => setSelectedCategory(category.name)}
                                sx={{ px: 2 }}
                            />
                        ))}
                    </Box>
                </Box>

                <Paper
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    elevation={3}
                    sx={{ p: 3, mb: 4 }}
                >
                    <Typography variant="h6" gutterBottom>
                        Start a Discussion
                    </Typography>
                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        variant="outlined"
                        placeholder="Share your career questions or thoughts..."
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNewPost}
                        sx={{ borderRadius: 2 }}
                    >
                        Post Discussion
                    </Button>
                </Paper>

                <Box sx={{ mt: 4 }}>
                    {posts
                        .filter(post => selectedCategory === 'All' || post.category === selectedCategory)
                        .map((post, index) => (
                        <MotionCard
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            sx={{ mb: 3 }}
                            elevation={2}
                        >
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Avatar src={post.avatar} alt={post.author} />
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {post.author}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {post.role} • {post.time}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Typography variant="body1" sx={{ mt: 2, mb: 2 }}>
                                    {post.content}
                                </Typography>
                                <Box sx={{ mb: 2 }}>
                                    <Chip
                                        icon={categories.find(c => c.name === post.category)?.icon}
                                        label={post.category}
                                        size="small"
                                        sx={{ mr: 1, mt: 1 }}
                                        color="secondary"
                                    />
                                    {post.tags.map((tag) => (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            size="small"
                                            sx={{ mr: 1, mt: 1 }}
                                            color="primary"
                                            variant="outlined"
                                        />
                                    ))}
                                </Box>
                                {post.responses && post.responses.map((response, idx) => (
                                    <Box
                                        key={idx}
                                        sx={{
                                            ml: 4,
                                            mt: 2,
                                            p: 2,
                                            bgcolor: 'background.paper',
                                            borderLeft: '4px solid',
                                            borderColor: 'primary.main',
                                            borderRadius: 1
                                        }}
                                    >
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {response.author}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                                            {response.role}
                                        </Typography>
                                        <Typography variant="body2">
                                            {response.content}
                                        </Typography>
                                    </Box>
                                ))}
                                <Divider sx={{ my: 2 }} />
                                <Box sx={{ display: 'flex', gap: 2 }}>
                                    <Button
                                        startIcon={<ThumbUpIcon />}
                                        size="small"
                                        color="primary"
                                    >
                                        {post.likes} Likes
                                    </Button>
                                    <Button
                                        startIcon={<CommentIcon />}
                                        size="small"
                                        color="primary"
                                    >
                                        {post.comments} Comments
                                    </Button>
                                    <Button
                                        startIcon={<ShareIcon />}
                                        size="small"
                                        color="primary"
                                    >
                                        Share
                                    </Button>
                                </Box>
                            </CardContent>
                        </MotionCard>
                    ))}
                </Box>
            </Container>
        </Box>
    );
};

export default ForumPage;
