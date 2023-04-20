import React from 'react';
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
} from "@mui/material";

import { Configuration, OpenAIApi } from "openai";

const API_KEY = process.env.REACT_APP_API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateImage(prompt) {
  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    });
    return response.data.data[0].url;
  } catch (error) {
    console.error(error);
    return "";
  }
}

const ImageGeneratorPage = () => {
    generateImage();
  return (
    <Container>
      <Typography variant="h4">Step 4: Create a personalized image using AI</Typography>
      <Box component="form" mt={2}>
        <TextField
          label="Enter a description"
          fullWidth
          value={prompt}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={{ marginTop: '1rem' }}
        >
          Generate Image
        </Button>
      </Box>
        <Box mt={4}>
          <img alt="ImageGenerated" style={{ maxWidth: '100%' }} />
        </Box>
    </Container>
  );
};

export default ImageGeneratorPage;
