import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Stepper,
    Step,
    StepLabel,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Paper,
    CircularProgress,
    Alert,
    Grid
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import PsychologyIcon from '@mui/icons-material/Psychology';
import WorkIcon from '@mui/icons-material/Work';
import PersonIcon from '@mui/icons-material/Person';

const assessmentTypes = [
    {
        id: 'technical',
        title: 'Technical Skills',
        icon: <CodeIcon sx={{ fontSize: 40 }} />,
        description: 'Evaluate your programming, technical, and analytical abilities',
        questions: [
            {
                id: 1,
                question: 'How comfortable are you with learning new programming languages?',
                options: [
                    { value: 'beginner', label: 'I find it challenging' },
                    { value: 'intermediate', label: 'I can learn with some effort' },
                    { value: 'advanced', label: 'I learn new languages easily' }
                ]
            },
            {
                id: 2,
                question: 'How would you rate your problem-solving abilities?',
                options: [
                    { value: 'beginner', label: 'I need guidance for complex problems' },
                    { value: 'intermediate', label: 'I can solve most problems independently' },
                    { value: 'advanced', label: 'I excel at solving complex problems' }
                ]
            },
            {
                id: 3,
                question: 'How experienced are you with database management?',
                options: [
                    { value: 'beginner', label: 'Basic understanding' },
                    { value: 'intermediate', label: 'Comfortable with common operations' },
                    { value: 'advanced', label: 'Expert in optimization and design' }
                ]
            }
        ]
    },
    {
        id: 'soft',
        title: 'Soft Skills',
        icon: <PsychologyIcon sx={{ fontSize: 40 }} />,
        description: 'Assess your communication, leadership, and interpersonal skills',
        questions: [
            {
                id: 1,
                question: 'How do you handle conflicts in a team?',
                options: [
                    { value: 'beginner', label: 'I prefer to avoid conflicts' },
                    { value: 'intermediate', label: 'I can manage most conflicts' },
                    { value: 'advanced', label: 'I excel at conflict resolution' }
                ]
            },
            {
                id: 2,
                question: 'How comfortable are you with public speaking?',
                options: [
                    { value: 'beginner', label: 'I get nervous speaking publicly' },
                    { value: 'intermediate', label: 'I can present when prepared' },
                    { value: 'advanced', label: 'I enjoy public speaking' }
                ]
            },
            {
                id: 3,
                question: 'How do you adapt to change in the workplace?',
                options: [
                    { value: 'beginner', label: 'I prefer stability' },
                    { value: 'intermediate', label: 'I can adapt with time' },
                    { value: 'advanced', label: 'I thrive in dynamic environments' }
                ]
            }
        ]
    },
    {
        id: 'values',
        title: 'Career Values',
        icon: <WorkIcon sx={{ fontSize: 40 }} />,
        description: 'Understand your work preferences and career motivations',
        questions: [
            {
                id: 1,
                question: 'What matters most to you in a job?',
                options: [
                    { value: 'stability', label: 'Job security and stability' },
                    { value: 'growth', label: 'Learning and growth opportunities' },
                    { value: 'impact', label: 'Making a meaningful impact' }
                ]
            },
            {
                id: 2,
                question: 'What type of work environment do you prefer?',
                options: [
                    { value: 'structured', label: 'Structured and organized' },
                    { value: 'flexible', label: 'Flexible and autonomous' },
                    { value: 'collaborative', label: 'Team-oriented and collaborative' }
                ]
            },
            {
                id: 3,
                question: 'What motivates you most at work?',
                options: [
                    { value: 'recognition', label: 'Recognition and rewards' },
                    { value: 'challenge', label: 'Challenging projects' },
                    { value: 'balance', label: 'Work-life balance' }
                ]
            }
        ]
    },
    {
        id: 'personality',
        title: 'Personality & Interests',
        icon: <PersonIcon sx={{ fontSize: 40 }} />,
        description: 'Discover how your personality traits align with different careers',
        questions: [
            {
                id: 1,
                question: 'How do you prefer to work?',
                options: [
                    { value: 'independent', label: 'Independently' },
                    { value: 'team', label: 'In a team' },
                    { value: 'mixed', label: 'Mix of both' }
                ]
            },
            {
                id: 2,
                question: 'What type of tasks energize you?',
                options: [
                    { value: 'creative', label: 'Creative and innovative work' },
                    { value: 'analytical', label: 'Analysis and problem-solving' },
                    { value: 'people', label: 'Working with people' }
                ]
            },
            {
                id: 3,
                question: 'How do you approach deadlines?',
                options: [
                    { value: 'early', label: 'Complete work well ahead' },
                    { value: 'steady', label: 'Work at a steady pace' },
                    { value: 'pressure', label: 'Work best under pressure' }
                ]
            }
        ]
    }
];

const SkillAssessment = () => {
    const navigate = useNavigate();
    const [activeTest, setActiveTest] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleStartTest = (testId) => {
        setActiveTest(testId);
        setCurrentQuestion(0);
        setAnswers({});
        setResults(null);
    };

    const handleAnswer = (questionId, answer) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: answer
        }));
    };

    const getTestQuestions = () => {
        return assessmentTypes.find(test => test.id === activeTest)?.questions || [];
    };

    const calculateResults = () => {
        setLoading(true);
        
        // Simulate API call delay
        setTimeout(() => {
            const testType = assessmentTypes.find(test => test.id === activeTest);
            const answerCount = Object.values(answers).reduce((acc, val) => {
                acc[val] = (acc[val] || 0) + 1;
                return acc;
            }, {});

            let skillLevel;
            let recommendations = [];

            // Determine skill level based on answers
            if (answerCount['advanced'] >= 2) {
                skillLevel = 'Advanced';
                switch (activeTest) {
                    case 'technical':
                        recommendations = ['Senior Software Engineer', 'Technical Architect', 'Lead Developer'];
                        break;
                    case 'soft':
                        recommendations = ['Project Manager', 'Team Lead', 'Product Manager'];
                        break;
                    case 'values':
                        recommendations = ['Startup Founder', 'Innovation Manager', 'Strategy Consultant'];
                        break;
                    case 'personality':
                        recommendations = ['Technical Director', 'Research Scientist', 'Technology Consultant'];
                        break;
                }
            } else if (answerCount['intermediate'] >= 2) {
                skillLevel = 'Intermediate';
                switch (activeTest) {
                    case 'technical':
                        recommendations = ['Full Stack Developer', 'DevOps Engineer', 'Systems Analyst'];
                        break;
                    case 'soft':
                        recommendations = ['Scrum Master', 'Business Analyst', 'Technical Trainer'];
                        break;
                    case 'values':
                        recommendations = ['Product Owner', 'Digital Consultant', 'Technical Account Manager'];
                        break;
                    case 'personality':
                        recommendations = ['UX Designer', 'Data Analyst', 'Quality Assurance Engineer'];
                        break;
                }
            } else {
                skillLevel = 'Beginner';
                switch (activeTest) {
                    case 'technical':
                        recommendations = ['Junior Developer', 'QA Tester', 'Technical Support'];
                        break;
                    case 'soft':
                        recommendations = ['Junior Business Analyst', 'Technical Writer', 'Support Specialist'];
                        break;
                    case 'values':
                        recommendations = ['Junior Project Coordinator', 'IT Support', 'Digital Marketing'];
                        break;
                    case 'personality':
                        recommendations = ['Web Developer', 'Content Creator', 'Digital Assistant'];
                        break;
                }
            }

            setResults({
                testType: testType.title,
                skillLevel,
                recommendations
            });
            setLoading(false);
        }, 1500);
    };

    const handleNext = () => {
        if (currentQuestion < getTestQuestions().length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            calculateResults();
        }
    };

    const handleRetake = () => {
        setActiveTest(null);
        setCurrentQuestion(0);
        setAnswers({});
        setResults(null);
    };

    if (!activeTest) {
        return (
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Typography variant="h3" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
                    Career Skill Assessment
                </Typography>
                <Typography variant="h6" sx={{ mb: 6, textAlign: 'center', color: 'text.secondary' }}>
                    Choose a test to assess your skills and discover suitable career paths
                </Typography>
                <Grid container spacing={4}>
                    {assessmentTypes.map((test) => (
                        <Grid item xs={12} sm={6} md={3} key={test.id}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-8px)',
                                        boxShadow: 6
                                    }
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                                    <Box sx={{ mb: 2, color: 'primary.main' }}>
                                        {test.icon}
                                    </Box>
                                    <Typography variant="h5" component="h2" gutterBottom>
                                        {test.title}
                                    </Typography>
                                    <Typography color="text.secondary" paragraph>
                                        {test.description}
                                    </Typography>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleStartTest(test.id)}
                                        sx={{ mt: 2 }}
                                    >
                                        Start Test
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <CircularProgress size={60} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                    Analyzing your responses...
                </Typography>
            </Box>
        );
    }

    if (results) {
        return (
            <Container maxWidth="md" sx={{ py: 8 }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                    <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
                        Your {results.testType} Assessment Results
                    </Typography>
                    <Alert severity="success" sx={{ mb: 4 }}>
                        Your skill level: <strong>{results.skillLevel}</strong>
                    </Alert>
                    <Typography variant="h6" gutterBottom>
                        Recommended Career Paths:
                    </Typography>
                    <Box sx={{ mb: 4 }}>
                        {results.recommendations.map((rec, index) => (
                            <Typography key={index} sx={{ py: 1 }}>
                                • {rec}
                            </Typography>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button variant="outlined" onClick={handleRetake}>
                            Take Another Test
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => {
                                // Save results logic here
                                alert('Results saved successfully!');
                            }}
                        >
                            Save Results
                        </Button>
                    </Box>
                </Paper>
            </Container>
        );
    }

    const currentTestQuestions = getTestQuestions();
    const question = currentTestQuestions[currentQuestion];

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
                    {assessmentTypes.find(test => test.id === activeTest)?.title}
                </Typography>
                
                <Stepper activeStep={currentQuestion} sx={{ mb: 4 }}>
                    {currentTestQuestions.map((_, index) => (
                        <Step key={index}>
                            <StepLabel></StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <FormControl component="fieldset" sx={{ width: '100%', mb: 4 }}>
                    <FormLabel component="legend" sx={{ mb: 2, fontSize: '1.1rem' }}>
                        {question.question}
                    </FormLabel>
                    <RadioGroup
                        value={answers[question.id] || ''}
                        onChange={(e) => handleAnswer(question.id, e.target.value)}
                    >
                        {question.options.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                                sx={{ mb: 1 }}
                            />
                        ))}
                    </RadioGroup>
                </FormControl>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        variant="outlined"
                        onClick={handleRetake}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        disabled={!answers[question.id]}
                    >
                        {currentQuestion < currentTestQuestions.length - 1 ? 'Next' : 'Submit'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default SkillAssessment;
