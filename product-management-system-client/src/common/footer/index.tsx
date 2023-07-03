import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
  return (
    <Box>
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
          bottom: "0",
          left: "0",
          zIndex: "100",
        }}
      >
        <Grid item>
          <Typography sx={{ fontSize: "0.5rem", fontWeight: "400" }}>
            ©2022 All Rights Reserved.
          </Typography>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <YouTubeIcon fontSize="small" />
            </Grid>
            <Grid item>
              <TwitterIcon fontSize="small" />
            </Grid>
            <Grid item>
              <FacebookIcon fontSize="small" />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <Typography sx={{ fontWeight: "500", fontSize: "0.5rem" }}>
                Contact us
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ fontWeight: "500", fontSize: "0.5rem" }}>
                Privacy Policies
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ fontWeight: "500", fontSize: "0.5rem" }}>
                Help
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
