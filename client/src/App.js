import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Global, css } from '@emotion/react';

// Components
import WhatsAppButton from './components/common/WhatsAppButton';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CommunityPage from './components/community/CommunityPage';
import HomePage from './components/home/HomePage';
import CareerOptions from './components/career/CareerOptions';
import Navbar from './components/layout/Navbar';
import ForumPage from './components/forum/ForumPage';
import RuhiPage from './components/ruhi/RuhiPage';
import MarketplacePage from './components/marketplace/MarketplacePage';
import Dashboard from './components/dashboard/Dashboard';
import DayInLife from './components/dayinlife/DayInLife';
import SkillAssessment from './components/assessment/SkillAssessment';

// Import custom theme
import theme from './theme';

// Add Inter font
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
document.head.appendChild(link);

// Global styles
const globalStyles = css`
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f5f9;
  }
  ::-webkit-scrollbar-thumb {
    background: #94a3b8;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #64748b;
  }
  ::selection {
    background: ${theme.palette.primary.light};
    color: white;
  }
`;

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Global styles={globalStyles} />
      <Router>
        <Navbar />
        <Box 
          sx={{ 
            pt: 8,
            minHeight: '100vh',
            background: theme.palette.background.default,
            transition: 'all 0.3s ease-in-out'
          }}
        >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/community"
            element={
              <PrivateRoute>
                <CommunityPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/career-options"
            element={
              <PrivateRoute>
                <CareerOptions />
              </PrivateRoute>
            }
          />
          <Route
            path="/forum"
            element={
              <PrivateRoute>
                <ForumPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/ruhi"
            element={
              <PrivateRoute>
                <RuhiPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/marketplace"
            element={
              <PrivateRoute>
                <MarketplacePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/day-in-life"
            element={
              <PrivateRoute>
                <DayInLife />
              </PrivateRoute>
            }
          />
          <Route
            path="/skill-assessment"
            element={
              <PrivateRoute>
                <SkillAssessment />
              </PrivateRoute>
            }
          />
        </Routes>
        </Box>
        <WhatsAppButton />
      </Router>
    </ThemeProvider>
  );
}

export default App;
