import { useState } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";

import CloseIcon from "@mui/icons-material/Close";

import SignIn from "../signIn";
import SignUp from "../signUp";
import ChangePassword from "../changePassword";

import "./index.css";

const MyModal = (props: any) => {
  const {
    open,
    handleClose,
    modalStatus,
    setModalStatus,
    setUserStatus,
    setUserCart,
    setUserType,
    setAlert,
  } = props;

  const [isFirstInput, setIsFirstInput] = useState(true);

  const onClose = () => {
    handleClose();
    setIsFirstInput(true);
    setModalStatus("SIGNIN");
  };

  function modalContent(modalStatus: string) {
    switch (modalStatus) {
      case "SIGNIN":
        return (
          <SignIn
            setModalStatus={setModalStatus}
            setUserStatus={setUserStatus}
            handleClose={() => {
              handleClose();
              setIsFirstInput(true);
            }}
            isFirstInput={isFirstInput}
            setIsFirstInput={setIsFirstInput}
            setUserCart={setUserCart}
            setUserType={setUserType}
            setNeedSignInAlert={setAlert}
          />
        );
      case "SIGNUP":
        return (
          <SignUp
            setModalStatus={setModalStatus}
            setUserStatus={setUserStatus}
            handleClose={() => {
              handleClose();
              setIsFirstInput(true);
            }}
            isFirstInput={isFirstInput}
            setIsFirstInput={setIsFirstInput}
            setAlert={setAlert}
          />
        );
      case "CHANGEPASSWORD":
        return (
          <ChangePassword
            setModalStatus={setModalStatus}
            setUserStatus={setUserStatus}
            handleClose={() => {
              handleClose();
              setIsFirstInput(true);
            }}
            isFirstInput={isFirstInput}
            setIsFirstInput={setIsFirstInput}
          />
        );
      default:
        (window as any).setError();
      // throw new Error("Invalid Status");
    }
  }

  return (
    <Modal open={open} onClose={onClose} className="my-modal">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "100px",
            padding: "15px 20px",
            backgroundColor: "#ffffff",
            boxShadow: "0px 5px 16px 1px rgba(229, 229, 229, 0.8)",
            borderRadius: "10px",
          }}
        >
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            height="20px"
          >
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
          {modalContent(modalStatus)}
        </Box>
      </Container>
    </Modal>
  );
};

export default MyModal;
