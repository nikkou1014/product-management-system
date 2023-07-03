import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ErrorPage = (props: any) => {
  const { setIsError } = props;

  return (
    <Container sx={{ width: "90%", minHeight: "75vh", margin: "auto" }}>
      <Grid container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "4px",
          padding: "9.7rem",
        }}
      >
        <ErrorOutlineIcon color="primary" sx={{ fontSize: "3rem" }} />
        <Typography sx={{ fontWeight: "700", fontSize: "1.2rem", padding: "1rem" }}>
          Oops, something went wrong!
        </Typography>
        <Button variant="contained" onClick={() => setIsError(false)} sx={{ width: "9rem" }}>
          Go Home
        </Button>
      </Grid>
    </Container>
  )
};

export default ErrorPage;