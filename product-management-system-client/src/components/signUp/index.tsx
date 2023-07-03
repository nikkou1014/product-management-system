import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import api from "../../api/signInApi";

import "./index.css";

const SignUp = (props: any) => {
  const {
    setModalStatus,
    setUserStatus,
    handleClose,
    isFirstInput,
    setIsFirstInput,
    setAlert,
  } = props;

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

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

  const handleEmailChange = (event: any) => {
    setUserEmail(event.target.value);
    setIsFirstInput(false);
  };

  const handlePasswordChange = (event: any) => {
    setUserPassword(event.target.value);
    setIsFirstInput(false);
  };

  const validate = () => {
    return (
      !isFirstInput &&
      isEmail(userEmail) &&
      userPassword !== ''
    )
  };

  const submit = async (event: React.MouseEvent) => {
    try {
      if (!validate()) {
        setIsFirstInput(false);
      } else {
        event.preventDefault();
        const response = await api.signUpApi({
          email: userEmail,
          password: userPassword,
        });
        setUserStatus("SIGNIN");
        document.cookie = "uuid=" + response.uuid;
        setAlert(false);
        handleClose();
      }
    } catch (e) {
      console.log(e);
      (window as any).setError();
      // throw new Error("Sign up API error");
    }
  };

  return (
    <>
      <div className="modal-title">
        <Typography component="h1" variant="h5">
          Sign Up
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
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={userPassword}
          onChange={handlePasswordChange}
          error={!isFirstInput && userPassword === ""}
          helperText={(!isFirstInput && userPassword === "") ? "Password can't be empty" : ""}
          autoComplete="current-password"
        />
        <Button
          onClick={submit}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item xs>
            {"Already have an account "}
            <Link
              href="#"
              variant="body2"
              onClick={() => {
                setModalStatus("SIGNIN");
              }}
            >
              {"Sign in"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignUp;
