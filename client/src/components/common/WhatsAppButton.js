import React from 'react';
import { Fab, Tooltip, Zoom } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token;

    const handleClick = () => {
        window.open('https://wa.me/917249347757?text=Hi', '_blank');
    };

    if (!isAuthenticated) {
        return null;
    }

    return (
        <Tooltip
            title="Chat with AI Career Assistant"
            placement="left"
            TransitionComponent={Zoom}
            arrow
        >
            <Fab
                component={motion.button}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.1, boxShadow: '0 8px 16px rgba(37, 211, 102, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                color="success"
                aria-label="whatsapp"
                onClick={handleClick}
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    bgcolor: '#25D366',
                    color: '#FFFFFF',
                    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.2)',
                    '&:hover': {
                        bgcolor: '#22C55E'
                    },
                    zIndex: 1000,
                    width: 64,
                    height: 64,
                }}
            >
                <WhatsAppIcon sx={{ fontSize: 32 }} />
            </Fab>
        </Tooltip>
    );
};

export default WhatsAppButton;
