import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import api from "../../api/signInApi";

import "./index.css";

const SignIn = (props: any) => {
  const {
    setModalStatus,
    setUserStatus,
    handleClose,
    isFirstInput,
    setIsFirstInput,
    setUserCart,
    setUserType,
    setNeedSignInAlert,
  } = props;

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [alert, setAlert] = useState(false);

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
        const response = await api.signInApi({
          email: userEmail,
          password: userPassword,
        });

        if (response === "UNAUTHORIZED") {
          setAlert(true);
        } else if (response === "NON_EXISTENT_USER") {
          setAlert(true);
        } else {
          setUserStatus("SIGNIN");
          setUserType(response.type);
          setUserCart(response.cart);

          document.cookie = "uuid=" + response.uuid;
          setNeedSignInAlert(false);
          handleClose();
        }
      }
    } catch (e) {
      console.log(e);
      (window as any).setError();
      // throw new Error("Sign in API error");
    }
  };

  return (
    <>
      <div className="modal-title">
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
      </div>

      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        className="modal-content-form"
      >
        <Alert severity="error" sx={{ display: alert ? "" : "none" }}>
          Invalid email or password!
        </Alert>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          value={userEmail}
          onChange={handleEmailChange}
          error={!isEmail(userEmail)}
          helperText={!isEmail(userEmail) ? "Invalid email address" : ""}
          type="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          label="Password"
          value={userPassword}
          onChange={handlePasswordChange}
          error={!isFirstInput && userPassword === ""}
          helperText={(!isFirstInput && userPassword === "") ? "Password can't be empty" : ""}
          type="password"
          autoComplete="current-password"
        />
        <Button
          type="submit"
          onClick={submit}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {"Sign In"}
        </Button>
        <Grid container>
          <Grid item xs>
            {"Don't have an account? "}
            <Link
              href="#"
              variant="body2"
              onClick={() => {
                setModalStatus("SIGNUP");
              }}
            >
              {"Sign Up"}
            </Link>
          </Grid>
          <Grid item>
            <Link
              href="#"
              variant="body2"
              onClick={() => {
                setModalStatus("CHANGEPASSWORD");
              }}
            >
              {"Forgot password?"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignIn;
