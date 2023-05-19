import React from "react";
import {
  Modal,
  Grid,
  Typography,
  Box,
  Stack,
  Paper,
  IconButton,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";

const Image2Modal = (props) => {
  const { open, handleClose, category } = props;
  const categoryArray = category || [];
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          bgcolor: "white",
          boxShadow: 20,
          borderRadius: 4,
          p: 2,
          m: 1,
          mr:2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxHeight: "80vh",
          width:{xs:"45vh", sm:"80vh"},
          overflow: "auto",
        }}
      >
        <Stack
          sx={{
            mt: "10px"
          }}
        >
          <IconButton
            aria-label="close"
            onClick={props.handleClose}
            sx={{ position: "absolute", top: 2, right: 2, mb: "5px" }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{
              mt: "5px",
              mb: "5px",
              paddingTop: "15px",
              paddingLeft: "20px",
              fontFamily: "Kreon",
              fontSize: {
                xs: "15px",
                sm: "20px",
                md: "25px",
              },
            }}
          >
            AI images generated:
          </Typography>
          {categoryArray && categoryArray.length > 0 ? (
            <Grid container spacing={2}>
              {categoryArray.map((item) => (
                <Grid key={item.id} item xs={6} sm={4} md={3}>
                  <Item
                    sx={{
                      cursor: "pointer",
                      fontFamily: "Kreon",
                      fontSize: "20px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <img
                        src={item.path}
                        alt={item.title}
                        style={{ maxHeight: "150px", maxWidth: "150px" }}
                      />
                    </div>
                    <Grid item>
                      <Grid container justifyContent="center" spacing={1}>
                        <Grid item>{item.title}</Grid>
                      </Grid>
                    </Grid>
                  </Item>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography>No items found in this category.</Typography>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={props.handleClose}
              variant="contained"
              sx={{
                fontFamily: "Kreon",
                backgroundColor: "grey",
                "&:hover": { backgroundColor: "#00334A" },
                mt: "20px",
              }}
            >
              Continue
            </Button>
          </div>
        </Stack>
      </Box>
    </Modal>
  );
};

export default Image2Modal;