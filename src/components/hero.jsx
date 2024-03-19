import { Button, Grid, Typography } from '@mui/material';
import xray from '../assets/xray.jpeg';
function Hero() {
  return (
    <Grid container direction={'row'} padding={{ xs: 8, sm: 12, md: 16, lg: 24, xl: 32 }}>
      <Grid item xs={12} sm={12} md={8} lg={8}>
        <Typography variant="h2" fontWeight={'bold'}>
          this is a landing page
        </Typography>
        <Typography variant="body1">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis, odit praesentium porro unde eligendi error
          laboriosam, molestiae hic aliquid accusantium quibusdam perspiciatis sint dicta obcaecati quidem aspernatur
          enim labore in.
        </Typography>
        <br />
        <Button variant="contained">Get Started</Button>
      </Grid>

      <Grid item xs={0} sm={0} md={4} lg={4} p={4}>
        <img src={xray} alt="xray" width={'100%'}></img>
      </Grid>
    </Grid>
  );
}

export default Hero;
