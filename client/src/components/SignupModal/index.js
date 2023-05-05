import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

function SignupModal(props) {
  const { open, handleClose } = props;

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [addUser] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
      console.log(data);
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

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
          minWidth: "300px",
          minHeight: "350px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack>
          <IconButton
            aria-label="close"
            onClick={props.handleClose}
            sx={{ position: "absolute", top: 3, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
          <a href="/">
            <img
              src={require("../../assets/logo/blueLogo_storyMakerAI.png")}
              alt="icon"
              width="250px"
            ></img>
          </a>
          <form
            onSubmit={handleFormSubmit}
            className="space-y-4 md:space-y-6"
            action="#"
          >
            <Stack>
              <TextField
                id="email"
                label="email"
                type="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                fullWidth
                autoFocus
                sx={{  m:2, ml:0 }}
              />
              <TextField
                id="firstName"
                label="First Name"
                type="firstName"
                name="firstName"
                value={formState.firstName}
                onChange={handleChange}
                required
                fullWidth
                autoFocus
                sx={{  m:2, ml:0 }}
              />
              <TextField
                id="lastName"
                label="Last Name"
                type="lastName"
                name="lastName"
                value={formState.lastName}
                onChange={handleChange}
                required
                fullWidth
                autoFocus
                sx={{  m:2, ml:0 }}
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                name="password"
                value={formState.password}
                onChange={handleChange}
                required
                fullWidth
                sx={{  m:2, ml:0 }}
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    margin: 1,
                    backgroundColor: "#00334A",
                    "&:hover": { backgroundColor: "darkgrey" },
                  }}
                >
                  Signup
                </Button>
              </Box>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Modal>
  );
}

export default SignupModal;
