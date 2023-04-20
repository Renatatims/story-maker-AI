import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import HTMLFlipBook from "react-pageflip";

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
     <h1> Step 3: Generate your personalized story </h1>
      <Card
        sx={{ maxWidth: 600, margin: "auto", boxShadow: 10 }}
      >
        <CardMedia
          component="img"
          height="300"
          image="https://oaidalleapiprodscus.blob.core.windows.net/private/org-SMUvkEA9tWEiwD7xWuhCDooP/user-7y3wqadbyGnYtO8RwEigLlR1/img-GTN6nVvFmtZN7F7TdRAIA5f7.png?st=2023-04-20T19%3A20%3A05Z&se=2023-04-20T21%3A20%3A05Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-20T17%3A07%3A58Z&ske=2023-04-21T17%3A07%3A58Z&sks=b&skv=2021-08-06&sig=/NQhW1JE%2BVYffKPZ4v6hv1PDDtBLFGgGkgkTGy4jFkU%3D"
          alt="imageAI"
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Olivia's christmas surprise
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {response}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ padding: 5, margin: 20 }}>
        <HTMLFlipBook width={600} height={500} paddingLeft={10}>
          {Array.from({ length: numPages }).map((_, i) => (
            <div key={i}>
              {sentences
                .slice(i * sentencesPerPage, (i + 1) * sentencesPerPage)
                .join(". ")}
              <img
                src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-SMUvkEA9tWEiwD7xWuhCDooP/user-7y3wqadbyGnYtO8RwEigLlR1/img-GTN6nVvFmtZN7F7TdRAIA5f7.png?st=2023-04-20T19%3A20%3A05Z&se=2023-04-20T21%3A20%3A05Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-20T17%3A07%3A58Z&ske=2023-04-21T17%3A07%3A58Z&sks=b&skv=2021-08-06&sig=/NQhW1JE%2BVYffKPZ4v6hv1PDDtBLFGgGkgkTGy4jFkU%3D"
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
