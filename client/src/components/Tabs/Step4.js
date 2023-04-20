import React, { useState } from 'react';
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  CircularProgress,
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

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const imagePrompt = prompt;
    const generatedImageUrl = await generateImage(imagePrompt);
    setImageUrl(generatedImageUrl);

    setLoading(false);
  };

  return (
    <Container>
      <Typography variant="h4">Step 4: Create a personalized image using AI</Typography>
      <Box component="form" onSubmit={handleSubmit} mt={2}>
        <TextField
          label="Enter a description"
          fullWidth
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={!prompt || loading}
          style={{ marginTop: '1rem' }}
        >
          Generate Image
        </Button>
      </Box>
      {loading && <CircularProgress />}
      {imageUrl && (
        <Box mt={4}>
          <img src={imageUrl} alt="Generated" style={{ maxWidth: '100%' }} />
        </Box>
      )}
    </Container>
  );
};

export default ImageGenerator;
