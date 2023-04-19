import React from 'react';
import Typography from '@mui/material/Typography';

function IntroPage() {
  return (
    <div sx={{ 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      padding: 4,
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial'
    }}>
      <Typography variant="h1" component="h1" sx={{ 
        fontSize: 48,
        fontWeight: 'bold',
        marginBottom: 2,
        textAlign: 'center',
      }}>
        Hello, and welcome to the Story Maker AI App!
      </Typography>
      <Typography variant="h2" component="h2" sx={{ 
        fontSize: 24,
        marginBottom: 4,
        textAlign: 'center',
      }}>
        create personalized stories using OpenAI API in a visual environment
      </Typography>
    </div>
  );
}

export default IntroPage;