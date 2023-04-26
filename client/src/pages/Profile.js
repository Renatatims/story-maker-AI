import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import exampleImage from "../assets/images/imgExample.PNG"; 

//use Query Hook
import { useQuery } from "@apollo/client";
import {QUERY_STORIES_AI } from "../utils/queries";

function ResponseFlipBook() {

  // QUERY_STORIES_AI query to get the list of stories from the database
  const { data } = useQuery(QUERY_STORIES_AI);
  console.log(data);
  const storiesAI = data?.storiesAI || [];

return (
    <>
    <Typography variant="h4" style={{ fontFamily:"Rancho", fontSize: "48px" }}> Saved Stories  </Typography>
    {storiesAI?.map((storiesAI, index) => (
        <>
     
      <Card
        key={index}
        sx={{ maxWidth: 600, margin: "auto", boxShadow: 10, marginBottom: "20px" }}
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
            Title
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily:"Rancho", fontSize: "30px" }}>
            {storiesAI.stories}
          </Typography>
        </CardContent>
      </Card>
      </>
      ))};
    </>
  );
}

export default ResponseFlipBook;