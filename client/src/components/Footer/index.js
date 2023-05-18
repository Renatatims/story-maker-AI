import React from 'react';
import { Typography, Box } from '@mui/material';

const footerStyles = {
  backgroundColor: '#00334A',
  color: 'common.white',
  padding: '16px',
  textAlign: 'center',
  position: 'fixed',
  left: 0,
  bottom: 0,
  width: '100%',
};

const Footer = () => {
  return (
    <Box component="footer" sx={footerStyles}>
      <Typography variant="body2" sx = {{fontFamily: "Kreon", fontSize: { xs: 18, sm:22 }}}>
        &copy; {new Date().getFullYear()} Story Maker AI, by Renata Rondon
      </Typography>
    </Box>
  );
};

export default Footer;