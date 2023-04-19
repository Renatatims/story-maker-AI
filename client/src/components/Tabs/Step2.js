import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  Stack,
} from "@mui/material";

import { Configuration, OpenAIApi } from "openai";

const API_KEY = process.env.REACT_APP_API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getResponse(userInput) {
  const prompt = userInput.trim();
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    return "An error occurred while fetching the data. Please try again later.";
  }
}

//Styling the Response:
const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "24px",
    backgroundColor: "#F8F8F8",
  },
  responseStory: {
    fontFamily: "Monospace",
    fontSize: "14px",
    lineHeight: "20px",
    backgroundColor: "#F1F1F1",
    padding: "12px",
    borderRadius: "4px",
  },
};

function StoryMaker() {
  const [character, setCharacter] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const prompt = `Please generate a story that included a main character with the name: name:${character}, and description: ${description} and has the following theme: ${theme}.`;
    const response = await getResponse(prompt);
    console.log(response);
    setResponse(response);
  };

  return (
    <>
      <h1> Step 2: Describe your story </h1>
      <form onSubmit={handleSubmit}>
        <h3 style={{ paddingTop: "15px", paddingLeft: "20px" }}>
          Please input the following info:
        </h3>
        <Card
          variant="outlined"
          sx={{
            m: "20px",
            p: "10px",
            borderColor: "dark",
            borderWidth: "5px",
          }}
        >
          <Stack>
            <div>
              <TextField
                label="Character's name"
                value={character}
                onChange={(e) => setCharacter(e.target.value)}
                sx={{ p: "10px" }}
              />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ p: "10px" }}
              />
              <TextField
                label="Theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                sx={{ p: "10px" }}
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "grey",
                "&:hover": { backgroundColor: "dark" },
              }}
            >
              Submit
            </Button>
          </Stack>
        </Card>
      </form>
      <Card>
        <div sx={styles.root}>
          <div sx={{ position: "relative" }}>
            <pre sx={styles.responseStory}>{response}</pre>
          </div>
        </div>
      </Card>
    </>
  );
}

export default StoryMaker;