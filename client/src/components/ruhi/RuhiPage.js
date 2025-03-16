import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Box, 
    Container, 
    Typography, 
    Button
} from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { motion } from "framer-motion";

const RuhiPage = () => {
  const navigate = useNavigate();
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const fullText = "Your AI-powered career guidance companion";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [navigate, fullText]);

  const handleRedirect = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    window.open(
      "https://wa.me/917249347757?text=Hi%20Ruhi!%20I%20need%20career%20guidance.",
      "_blank"
    );
  };



  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e7eb 100%)",
      }}
    >
      <Container maxWidth="sm">
        <Box 
          sx={{ 
            textAlign: "center",
            p: 6,
            bgcolor: "background.paper",
            borderRadius: 4,
            boxShadow: 3
          }}
        >
          <Typography
            component={motion.h1}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              background: "linear-gradient(45deg, #2563EB, #60A5FA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Ruhi
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "text.secondary",
              mb: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {displayText}
            {isTyping && (
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: "4px",
                  height: "24px",
                  ml: 1,
                  bgcolor: "primary.main",
                  animation: "blink 1s infinite",
                }}
              />
            )}
          </Typography>

          <Button
            variant="contained"
            onClick={handleRedirect}
            startIcon={<WhatsAppIcon />}
            sx={{
              px: 4,
              py: 2,
              borderRadius: "100px",
              fontSize: "1.1rem",
              textTransform: "none",
              background: "linear-gradient(45deg, #2563EB, #60A5FA)",
              boxShadow: "0 4px 15px rgba(37, 99, 235, 0.2)",
              "&:hover": {
                background: "linear-gradient(45deg, #1D4ED8, #3B82F6)",
                transform: "translateY(-3px)",
                boxShadow: "0 6px 20px rgba(37, 99, 235, 0.3)",
              },
            }}
          >
            Chat with Ruhi
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default RuhiPage;
