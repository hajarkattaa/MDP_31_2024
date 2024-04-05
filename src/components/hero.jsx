import { Button, Grid, Typography } from '@mui/material';

function Hero() {
  return (
    <Grid
      container
      direction={'row'}
      padding={{ xs: 8, sm: 12, md: 16, lg: 24, xl: 32 }}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url('https://source.unsplash.com/1600x900/?ai,medical')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Grid item xs={12} sm={12} md={8} lg={8} bgcolor={'rgba(255,255,255,0.8)'} padding={4}>
        <Typography variant="h2" fontWeight={'bold'}>
          Transforming Lung Cancer Detection
        </Typography>
        <Typography variant="h3">Empowering Healthcare Through AI</Typography>
        <br />
        <Button variant="contained" color="primary" size="large">
          Get Started
        </Button>
      </Grid>
    </Grid>
  );
}

export default Hero;
