import { Box, Grid, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      component={'footer'}
      sx={(theme) => ({
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        padding: theme.spacing(4),
      })}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h5" textAlign="center">
            Contact Us
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" textAlign="center">
            Email: info@lungcancerdetection.com
          </Typography>
          <Typography variant="body1" textAlign="center">
            Phone: 123-456-7890
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" textAlign="center">
            {new Date().getFullYear()} DeepPulmo - MDP
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
