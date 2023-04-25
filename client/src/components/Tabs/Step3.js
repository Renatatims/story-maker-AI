import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import HTMLFlipBook from "react-pageflip";
import exampleImage from "../../assets/images/imgExample.PNG"; // import the image

function ResponseFlipBook() {
  const response = `Once upon a time, there was a little girl named Olivia who absolutely
    loved Christmas. She was so excited for the holiday season and could talk
    about it all day long. Her parents loved her enthusiasm and decided to
    reward her with a special surprise - a visit from Santa Claus himself!
    Olivia couldn't believe it when Santa showed up at her door. She was so
    excited to meet him, but also a bit nervous. Santa was very kind and asked
    her what she wanted for Christmas. Olivia thought long and hard before
    finally deciding that she wanted a puppy. Santa gave her a big hug and
    said he would do his best to make her wish come true. On Christmas
    morning, Olivia opened her presents and found the most adorable puppy she
    had ever seen! She was so excited she couldn't contain her joy. Olivia and
    her puppy quickly became best friends. They spent every day playing
    together, going for walks, and having lots of cuddles. Olivia loved her
    puppy so much, and she was forever grateful to Santa for bringing him into
    her life.`;
  const sentencesPerPage = 1;
  const sentences = response.split(". "); // split response into an array of sentences
  const numPages = Math.ceil(sentences.length / sentencesPerPage); // calculate the number of pages needed

  return (
    <>
     <Typography variant="h4" style={{ fontFamily:"Rancho", fontSize: "48px" }}> Step 3: Generate your personalized story </Typography>
      <Card
        sx={{ maxWidth: 600, margin: "auto", boxShadow: 10 }}
      >
        <CardMedia
          component="img"
          height="300"
          src={exampleImage}
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
