import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import HTMLFlipBook from "react-pageflip";
import exampleImage from "../../assets/images/imgExample.PNG"; // import the image

function ResponseFlipBook() {
  const response = localStorage.getItem("response") || "";
  const sentencesPerPage = 1;
  const sentences = response.split(". "); // split response into an array of sentences
  const numPages = Math.ceil(sentences.length / sentencesPerPage); // calculate the number of pages needed
  const imageUrl = localStorage.getItem("imageUrl");

  return (
    <>
     <Typography variant="h4" style={{ fontFamily:"Rancho", fontSize: "48px" }}> Step 3: Generate your personalized story </Typography>
      <Card
        sx={{ maxWidth: 600, margin: "auto", boxShadow: 10 }}
      >
        <CardMedia
          component="img"
          height="300"
          src={imageUrl}
          alt="imageAI"
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{ fontFamily:"Rancho", fontSize: "35px" }}>
            Olivia's christmas surprise
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily:"Rancho", fontSize: "30px" }}>
            {response}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ padding: 5, margin: 20 }}>
        <HTMLFlipBook width={600} height={500} paddingLeft={10} style={{ fontFamily:"Rancho", fontSize: "30px" }}>
          {Array.from({ length: numPages }).map((_, i) => (
            <div key={i}>
              {sentences
                .slice(i * sentencesPerPage, (i + 1) * sentencesPerPage)
                .join(". ")}
              <img
                src={exampleImage}
                alt="imageAI"
                width={300}
                height={300}
              />
            </div>
          ))}
        </HTMLFlipBook>
      </Card>
    </>
  );
}

export default ResponseFlipBook;
