import React, { useState, useMemo } from 'react';
import { Container, Grid, Typography, Card, CardContent, CardMedia, Box, Chip, Button, TextField, Slider, InputAdornment, Stack, IconButton, Tooltip, Zoom } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const careerPaths = [
    {
        title: 'Software Development',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80',
        description: 'Design and develop software applications for India\'s growing tech industry. Work with top companies and startups.',
        skills: ['Full Stack Development', 'Cloud Computing', 'Mobile Apps', 'AI/ML Integration', 'DevOps'],
        salary: '₹5-25 LPA',
        companies: ['TCS', 'Infosys', 'Google', 'Microsoft'],
        growth: '22% YoY growth',
        certification: ['AWS Certified', 'Microsoft Certified', 'Google Cloud']
    },
    {
        title: 'Data Science',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
        description: 'Drive data-driven decisions in India\'s digital transformation. High demand across industries.',
        skills: ['Python', 'Machine Learning', 'Deep Learning', 'Big Data', 'SQL'],
        salary: '₹8-28 LPA',
        companies: ['Amazon', 'Flipkart', 'IBM', 'Mu Sigma'],
        growth: '30% YoY growth',
        certification: ['IBM Data Science', 'Google Data Analytics', 'Coursera Specialization']
    },
    {
        title: 'UX/UI Design',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80',
        description: 'Shape the future of digital products in India\'s booming startup ecosystem.',
        skills: ['UI Design', 'User Research', 'Figma', 'Adobe XD', 'Design Systems'],
        salary: '₹6-20 LPA',
        companies: ['Razorpay', 'CRED', 'Swiggy', 'PhonePe'],
        growth: '25% YoY growth',
        certification: ['Google UX Design', 'Interaction Design Foundation']
    },
    {
        title: 'Digital Marketing',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
        description: 'Lead digital transformation of businesses in India\'s growing e-commerce landscape.',
        skills: ['SEO/SEM', 'Social Media', 'Content Strategy', 'Analytics', 'Email Marketing'],
        salary: '₹4-15 LPA',
        companies: ['Zomato', 'OYO', 'Myntra', 'Nykaa'],
        growth: '28% YoY growth',
        certification: ['Google Digital Marketing', 'HubSpot', 'Meta Blueprint']
    },
    {
        title: 'Cloud Computing',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
        description: 'Build and manage cloud infrastructure for India\'s digital transformation.',
        skills: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker'],
        salary: '₹8-30 LPA',
        companies: ['AWS India', 'Microsoft', 'Google Cloud', 'Wipro'],
        growth: '35% YoY growth',
        certification: ['AWS Solutions Architect', 'Azure Administrator', 'GCP Engineer']
    },
    {
        title: 'Product Management',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
        description: 'Drive product innovation in India\'s fastest-growing startups and tech companies.',
        skills: ['Product Strategy', 'Data Analytics', 'Agile', 'User Research', 'Business Acumen'],
        salary: '₹12-40 LPA',
        companies: ['Flipkart', 'Paytm', 'Zerodha', 'Meesho'],
        growth: '40% YoY growth',
        certification: ['Product School', 'Scrum Master', 'AIPMM']
    }
];

const CareerOptions = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [salaryRange, setSalaryRange] = useState([4, 40]);
    const [selectedCompanies, setSelectedCompanies] = useState([]);

    // Get all unique skills and companies
    const allSkills = useMemo(() => {
        const skills = new Set();
        careerPaths.forEach(career => career.skills.forEach(skill => skills.add(skill)));
        return Array.from(skills);
    }, []);

    const allCompanies = useMemo(() => {
        const companies = new Set();
        careerPaths.forEach(career => career.companies.forEach(company => companies.add(company)));
        return Array.from(companies);
    }, []);

    // Filter careers based on search, skills, and salary
    const filteredCareers = useMemo(() => {
        return careerPaths.filter(career => {
            const matchesSearch = career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                career.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSkills = selectedSkills.length === 0 || 
                selectedSkills.some(skill => career.skills.includes(skill));
            const matchesCompanies = selectedCompanies.length === 0 ||
                selectedCompanies.some(company => career.companies.includes(company));
            const salary = parseInt(career.salary.match(/\d+/g)[0]);
            const matchesSalary = salary >= salaryRange[0] && salary <= salaryRange[1];
            return matchesSearch && matchesSkills && matchesSalary && matchesCompanies;
        });
    }, [searchTerm, selectedSkills, salaryRange, selectedCompanies]);

    const handleSkillClick = (skill) => {
        setSelectedSkills(prev => 
            prev.includes(skill) 
                ? prev.filter(s => s !== skill)
                : [...prev, skill]
        );
    };

    const handleCompanyClick = (company) => {
        setSelectedCompanies(prev => 
            prev.includes(company) 
                ? prev.filter(c => c !== company)
                : [...prev, company]
        );
    };

    const handleSalaryChange = (event, newValue) => {
        setSalaryRange(newValue);
    };
    const stats = [
        { label: 'Profile Views', value: '124' },
        { label: 'Connections', value: '45' },
        { label: 'Skill Endorsements', value: '38' },
    ];

    return (
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">
                {/* Search and Filter Section */}
                <Box sx={{ mb: 4 }}>
                    <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Search careers..."
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
                            <Typography gutterBottom>Salary Range (LPA): ₹{salaryRange[0]} - ₹{salaryRange[1]}</Typography>
                            <Slider
                                value={salaryRange}
                                onChange={handleSalaryChange}
                                min={4}
                                max={40}
                                step={1}
                                valueLabelDisplay="auto"
                                valueLabelFormat={(value) => `₹${value}L`}
                            />
                        </Grid>
                    </Grid>
                </Box>

                {/* Skills Filter */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        <SchoolIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Filter by Skills
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {allSkills.map((skill) => (
                            <Chip
                                key={skill}
                                label={skill}
                                onClick={() => handleSkillClick(skill)}
                                color={selectedSkills.includes(skill) ? "primary" : "default"}
                                sx={{ m: 0.5 }}
                            />
                        ))}
                    </Box>
                </Box>

                {/* Companies Filter */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        <WorkIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                        Filter by Companies
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {allCompanies.map((company) => (
                            <Chip
                                key={company}
                                label={company}
                                onClick={() => handleCompanyClick(company)}
                                color={selectedCompanies.includes(company) ? "secondary" : "default"}
                                sx={{ m: 0.5 }}
                            />
                        ))}
                    </Box>
                </Box>

                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    sx={{ mb: 6, textAlign: 'center' }}
                >
                    <Typography
                        variant="h3"
                        component="h1"
                        gutterBottom
                        color="primary"
                        sx={{ fontWeight: 'bold' }}
                    >
                        Explore Career Paths in India
                    </Typography>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}
                    >
                        Discover high-growth career opportunities in India's rapidly evolving job market
                    </Typography>
                </Box>

                <AnimatePresence>
                    <Grid container spacing={4}>
                        {filteredCareers.map((career, index) => (
                        <Grid item key={index} xs={12} md={6}>
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
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        transition: 'transform 0.3s ease-in-out',
                                        boxShadow: (theme) => `0 8px 24px ${theme.palette.primary.main}20`,
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={career.image}
                                    alt={career.title}
                                    sx={{ objectFit: 'cover' }}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                                        {career.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        {career.description}
                                    </Typography>

                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
                                            Key Skills:
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {career.skills.map((skill, idx) => (
                                                <Chip
                                                    key={idx}
                                                    label={skill}
                                                    size="small"
                                                    color="primary"
                                                    variant="outlined"
                                                />
                                            ))}
                                        </Box>
                                    </Box>

                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
                                            Top Companies:
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {career.companies.map((company, idx) => (
                                                <Chip
                                                    key={idx}
                                                    label={company}
                                                    size="small"
                                                    color="secondary"
                                                    variant="outlined"
                                                />
                                            ))}
                                        </Box>
                                    </Box>

                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="subtitle2" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
                                            Recommended Certifications:
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {career.certification.map((cert, idx) => (
                                                <Chip
                                                    key={idx}
                                                    label={cert}
                                                    size="small"
                                                    color="info"
                                                    variant="outlined"
                                                />
                                            ))}
                                        </Box>
                                    </Box>

                                    <Box sx={{ mt: 'auto', pt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                            {career.salary}
                                        </Typography>
                                        <Chip
                                            icon={<TrendingUpIcon />}
                                            label={career.growth}
                                            color="success"
                                            size="small"
                                            sx={{ fontWeight: 500 }}
                                        />
                                    </Box>
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

export default CareerOptions;
