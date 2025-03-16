import React from 'react';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    Chip,
    Rating,
    Avatar,
    Stack,
    Divider,
    TextField,
    Slider,
    InputAdornment,
    IconButton,
    Tooltip,
    Zoom,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InfoIcon from '@mui/icons-material/Info';

// Tech course images
const courseImages = {
    fullstack: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
    ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
    cloud: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=800',
    cybersecurity: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800',
    blockchain: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
    devops: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800'
};

const courses = [
    {
        id: 1,
        title: "Full Stack Development Bootcamp",
        instructor: "Prateek Sharma",
        instructorTitle: "Tech Lead, Microsoft",
        price: 29999,
        rating: 4.8,
        reviews: 1240,
        duration: "4 months",
        image: courseImages.fullstack,
        tags: ["MERN Stack", "React", "Node.js", "MongoDB"],
        description: "Master full-stack development with MERN stack. Build real-world projects and deploy them."
    },
    {
        id: 2,
        title: "AI & Machine Learning Pro",
        instructor: "Dr. Kavita Gupta",
        instructorTitle: "AI Researcher, Google",
        price: 34999,
        rating: 4.9,
        reviews: 890,
        duration: "6 months",
        image: courseImages.ai,
        tags: ["Python", "TensorFlow", "PyTorch", "Deep Learning"],
        description: "Deep dive into AI & ML with hands-on projects. Learn from industry experts."
    },
    {
        id: 3,
        title: "Cloud Computing & DevOps",
        instructor: "Rahul Verma",
        instructorTitle: "Cloud Architect, AWS",
        price: 24999,
        rating: 4.7,
        reviews: 750,
        duration: "3 months",
        image: courseImages.cloud,
        tags: ["AWS", "Azure", "Docker", "Kubernetes"],
        description: "Master cloud platforms and DevOps tools. Get certified and industry-ready."
    },
    {
        id: 4,
        title: "Cybersecurity Expert",
        instructor: "Amit Patel",
        instructorTitle: "Security Lead, Infosys",
        price: 39999,
        rating: 4.9,
        reviews: 620,
        duration: "5 months",
        image: courseImages.cybersecurity,
        tags: ["Network Security", "Ethical Hacking", "Cryptography"],
        description: "Learn advanced cybersecurity concepts and protect against modern threats."
    },
    {
        id: 5,
        title: "Blockchain Development",
        instructor: "Neha Singh",
        instructorTitle: "Blockchain Developer, Polygon",
        price: 44999,
        rating: 4.6,
        reviews: 480,
        duration: "4 months",
        image: courseImages.blockchain,
        tags: ["Solidity", "Web3.js", "Smart Contracts", "DApps"],
        description: "Build decentralized applications and smart contracts on Ethereum and other platforms."
    },
    {
        id: 6,
        title: "DevOps & SRE Mastery",
        instructor: "Vikram Malhotra",
        instructorTitle: "DevOps Engineer, Netflix",
        price: 32999,
        rating: 4.8,
        reviews: 540,
        duration: "4 months",
        image: courseImages.devops,
        tags: ["CI/CD", "Jenkins", "Terraform", "Monitoring"],
        description: "Master modern DevOps practices and tools used in top tech companies."
    }
];

const MarketplacePage = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedTags, setSelectedTags] = React.useState([]);
    const [selectedPriceRange, setPriceRange] = React.useState([0, 50000]);
    const [hoveredCourse, setHoveredCourse] = React.useState(null);

    // Get all unique tags
    const allTags = React.useMemo(() => {
        const tags = new Set();
        courses.forEach(course => course.tags.forEach(tag => tags.add(tag)));
        return Array.from(tags);
    }, []);

    // Filter courses based on search, tags, and price
    const filteredCourses = React.useMemo(() => {
        return courses.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesTags = selectedTags.length === 0 || 
                selectedTags.some(tag => course.tags.includes(tag));
            const matchesPrice = course.price >= selectedPriceRange[0] && 
                course.price <= selectedPriceRange[1];
            return matchesSearch && matchesTags && matchesPrice;
        });
    }, [searchTerm, selectedTags, selectedPriceRange]);

    const handleTagClick = (tag) => {
        setSelectedTags(prev => 
            prev.includes(tag) 
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const handlePriceChange = (event, newValue) => {
        setPriceRange(newValue);
    };
    return (
        <Box sx={{ bgcolor: 'background.default', py: 8 }}>
            <Container maxWidth="lg">
                {/* Header */}
                {/* Search and Filter Section */}
                <Box sx={{ mb: 4 }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Search courses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon color="primary" />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography gutterBottom>Price Range: ₹{selectedPriceRange[0]} - ₹{selectedPriceRange[1]}</Typography>
                            <Slider
                                value={selectedPriceRange}
                                onChange={handlePriceChange}
                                min={0}
                                max={50000}
                                step={1000}
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => `₹${value}`}
                            />
                        </Grid>
                    </Grid>
                </Box>

                {/* Tags Filter */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        <FilterListIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Filter by Skills
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {allTags.map((tag) => (
                            <Chip
                                key={tag}
                                label={tag}
                                onClick={() => handleTagClick(tag)}
                                color={selectedTags.includes(tag) ? "primary" : "default"}
                                sx={{ m: 0.5 }}
                            />
                        ))}
                    </Box>
                </Box>

                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    sx={{ mb: 6, textAlign: 'center' }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                            background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        Learn from Top Tech Industry Experts
                    </Typography>
                    <Typography
                        variant="h5"
                        color="text.secondary"
                        sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
                    >
                        Master cutting-edge technologies with hands-on projects and expert mentorship
                    </Typography>
                    <Divider sx={{ mb: 6 }} />
                </Box>

                {/* Course Grid */}
                <AnimatePresence>
                    <Grid container spacing={4}>
                        {filteredCourses.map((course) => (
                        <Grid item xs={12} sm={6} md={4} key={course.id}>
                            <Card
                                component={motion.div}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: '0 8px 40px rgba(0,0,0,0.1)'
                                }}
                                onMouseEnter={() => setHoveredCourse(course.id)}
                                onMouseLeave={() => setHoveredCourse(null)}
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRadius: 2,
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                    position: 'relative'
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={course.image}
                                    alt={course.title}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Stack spacing={2}>
                                        <Box sx={{ mb: 1 }}>
                                            {course.tags.map((tag) => (
                                                <Chip
                                                    key={tag}
                                                    label={tag}
                                                    size="small"
                                                    sx={{
                                                        mr: 1,
                                                        mb: 1,
                                                        bgcolor: 'primary.light',
                                                        color: 'white'
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                        <Typography variant="h5" component="h2" fontWeight="bold">
                                            {course.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {course.description}
                                        </Typography>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <Avatar
                                                sx={{
                                                    bgcolor: 'primary.main',
                                                    width: 32,
                                                    height: 32
                                                }}
                                            >
                                                {course.instructor.charAt(0)}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight="bold">
                                                    {course.instructor}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    {course.instructorTitle}
                                                </Typography>
                                            </Box>
                                            <VerifiedIcon
                                                sx={{ ml: 'auto', color: 'primary.main' }}
                                            />
                                        </Stack>
                                        <Divider />
                                        <Stack
                                            direction="row"
                                            justifyContent="space-between"
                                            alignItems="center"
                                        >
                                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                                <Rating value={course.rating} precision={0.1} readOnly size="small" />
                                                <Typography variant="body2" color="text.secondary">
                                                    ({course.reviews})
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                                <AccessTimeIcon fontSize="small" color="action" />
                                                <Typography variant="body2" color="text.secondary">
                                                    {course.duration}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Box
                                            sx={{
                                                mt: 2,
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                color="primary"
                                                sx={{ fontWeight: 'bold' }}
                                            >
                                                <CurrencyRupeeIcon sx={{ fontSize: 20, mb: -0.5 }} />
                                                {course.price}
                                            </Typography>
                                            <Stack direction="row" spacing={1}>
                                                <Button
                                                    variant="contained"
                                                    startIcon={<ShoppingCartIcon />}
                                                    sx={{
                                                        borderRadius: 2,
                                                        textTransform: 'none',
                                                        px: 3,
                                                        background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                                                        '&:hover': {
                                                            background: 'linear-gradient(45deg, #FF5252, #43A047)'
                                                        }
                                                    }}
                                                >
                                                    Enroll Now
                                                </Button>
                                                <Tooltip 
                                                    title="View course details" 
                                                    TransitionComponent={Zoom}
                                                    arrow
                                                >
                                                    <IconButton 
                                                        color="primary"
                                                        sx={{ bgcolor: 'rgba(0,0,0,0.05)' }}
                                                    >
                                                        <InfoIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                    </Grid>
                </AnimatePresence>
            </Container>
        </Box>
    );
};

export default MarketplacePage;
