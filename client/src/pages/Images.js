import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Card, CardMedia, Grid } from "@mui/material";
import { QUERY_IMAGES } from "../utils/queries";

const Images = () => {
  const { data } = useQuery(QUERY_IMAGES);
  const [userImages, setUserImages] = useState([]);

  useEffect(() => {
    if (data && data.images) {
      setUserImages(data.images);
    }
  }, [data]);

  return (
    <>
      <Grid container spacing={2}>
        {userImages.map((image, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="140"
                  src={`data:image/png;base64,${image.image}`}
                  alt={`image-${index}`}
                />
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Images;