import React from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import api from "../../api/signInApi";
import { Typography } from "@mui/material";

const Header = (props: any) => {
  const { setUserType, userStatus, setUserStatus, handleSignInOpen, handleCartOpen, setModalStatus, prices } = props;

  const signOut = async () => {
    try {
      await api.signOutApi(
        document.cookie.substring(5, document.cookie.length)
      );
      document.cookie = "uuid=null";
      setUserType("CUSTOMER");
      setUserStatus("SIGNOUT");
      setModalStatus("SIGNIN");
    } catch (e) {
      console.log(e);
      (window as any).setError();
      // throw new Error("Sign out API error");
    }
  };

  function buttonContent(userStatus: string) {
    switch (userStatus) {
      case "LOADING":
        return (
          <Button disabled>
            <PersonOutlineOutlinedIcon />
            {"Loading..."}
          </Button>
        );
      case "SIGNOUT":
        return (
          <Button onClick={handleSignInOpen} sx={{ color: "#ffffff" }}>
            <PersonOutlineOutlinedIcon />
            {"Sign In"}
          </Button>
        );
      case "SIGNIN":
        return (
          <Button onClick={signOut} sx={{ color: "#ffffff" }}>
            <PersonOutlineOutlinedIcon />
            {"Sign Out"}
          </Button>
        );
      default:
        console.log(userStatus);
        (window as any).setError();
      // throw new Error("Invalid Status");
    }
  }

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        className="header"
        sx={{
          backgroundColor: "#111827",
          color: "#ffffff",
          height: "3rem",
          width: "100%",
          padding: "0 2%",
          position: "fixed",
          top: "0",
          left: "0",
          zIndex: "100",
        }}
      >
        <Grid item>
          <Grid container direction="row" justifyContent="center">
            <Typography
              sx={{ color: "#ffffff", fontWeight: "700", fontSize: "1.3rem" }}>
              {"Management"}
            </Typography>
            <Typography
              sx={{ color: "#ffffff", fontWeight: "500", fontSize: "0.5rem", padding: "0.6rem" }}>
              {"Demo"}
            </Typography>
          </Grid>
        </Grid>
        <Paper
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            height: "25px",
            color: "#979797",
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
          />
          <IconButton sx={{ p: "10px" }} aria-label="search">
            <SearchOutlinedIcon />
          </IconButton>
        </Paper>
        {buttonContent(userStatus)}
        <Button onClick={handleCartOpen} sx={{ color: "#ffffff" }}>
          <ShoppingCartOutlinedIcon />
          {`$${prices.estimatedTotal.toFixed(2)}`}
        </Button>
      </Grid>
    </>
  );
};

export default Header;
