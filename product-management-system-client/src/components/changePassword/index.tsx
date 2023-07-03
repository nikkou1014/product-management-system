import React, { useState } from "react";
import ReactDOM from "react-dom";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";

import "./index.css";

const ChangePassword = (props: any) => {
  const {
    setModalStatus,
    setUserStatus,
    handleClose,
    isFirstInput,
    setIsFirstInput,
  } = props;

  const [userEmail, setUserEmail] = useState("");
  const [submitted, onSubmitted] = useState(false);

  const isEmail = (email: string) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (isFirstInput) {
      return true;
    } else if (email === "") {
      return false;
    } else if (!reg.test(email)) {
      return false;
    } else {
      return true;
    }
  };

  const validate = () => {
    return (
      !isFirstInput &&
      isEmail(userEmail)
    );
  };

  const handleEmailChange = (event: any) => {
    setUserEmail(event.target.value);
    setIsFirstInput(false);
  };

  return (
    <>
      {submitted ? (
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          className="modal-content-form"
        >
          <ForwardToInboxIcon
            sx={{
              display: "block",
              margin: "auto",
              fontSize: "40px",
            }}
          />
          <Typography component="h2" variant="h6">
            {
              "We have sent the update password link to your emial, please check that !"
            }
          </Typography>
        </Box>
      ) : (
        <>
          <div className="modal-title">
            <Typography component="h1" variant="h5">
              Update your password
            </Typography>
            <Typography component="h2" variant="h6">
              Enter your email link, we will send you the recovery link
            </Typography>
          </div>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            className="modal-content-form"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={userEmail}
              onChange={handleEmailChange}
              error={!isEmail(userEmail)}
              helperText={!isEmail(userEmail) ? "Invalid email address" : ""}
              autoComplete="email"
              autoFocus
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                if (!validate()) {
                  setIsFirstInput(false);
                } else {
                  onSubmitted(true);
                }
              }}
            >
              Update password
            </Button>
          </Box>
        </>
      )}
    </>
  );
};

export default ChangePassword;
