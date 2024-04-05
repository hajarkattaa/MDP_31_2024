import { Grid, Typography, Card, CardHeader, CardContent, Slide } from '@mui/material';
import { blue, green, purple, orange } from '@mui/material/colors';
import { AccessibilityNew, Build, CheckCircle, Group } from '@mui/icons-material';

function ContentSection() {
  return (
    <Grid container spacing={3} padding={{ xs: 8, sm: 12, md: 16, lg: 24, xl: 32 }}>
      <Grid item xs={12} sm={6}>
        <Slide direction="up" in={true} timeout={500}>
          <Card style={{ backgroundColor: blue[200], margin: 'auto' }}>
            <CardHeader
              avatar={<AccessibilityNew style={{ color: blue[800], width: 56, height: 56 }} />}
              titleTypographyProps={{ variant: 'h4', fontWeight: 'bold', color: blue[800] }}
              title="Welcome to Our Lung Cancer Detection App"
            />
            <CardContent>
              <Typography variant="body1">
                Harnessing the power of cutting-edge machine learning technology, we&lsquo;re revolutionizing the way
                lung cancer is detected and diagnosed.
              </Typography>
            </CardContent>
          </Card>
        </Slide>
      </Grid>
      {/* Repeat for other cards */}
      <Grid item xs={12} sm={6}>
        <Slide direction="up" in={true} timeout={700}>
          <Card style={{ backgroundColor: green[200], margin: 'auto' }}>
            <CardHeader
              avatar={<Build style={{ color: green[800], width: 56, height: 56 }} />}
              titleTypographyProps={{ variant: 'h4', fontWeight: 'bold', color: green[800] }}
              title="Empowering Healthcare Professionals"
            />
            <CardContent>
              <Typography variant="body1">
                Our app provides doctors with advanced tools to analyze submitted cases, from original images to
                segmented results, ensuring accurate assessments for optimal patient care.
              </Typography>
            </CardContent>
          </Card>
        </Slide>
      </Grid>
      {/* Repeat for other cards */}
      <Grid item xs={12} sm={6}>
        <Slide direction="up" in={true} timeout={900}>
          <Card style={{ backgroundColor: purple[200], margin: 'auto' }}>
            <CardHeader
              avatar={<CheckCircle style={{ color: purple[800], width: 56, height: 56 }} />}
              titleTypographyProps={{ variant: 'h4', fontWeight: 'bold', color: purple[800] }}
              title="Efficiency Redefined"
            />
            <CardContent>
              <Typography variant="body1">
                Say goodbye to time-consuming manual processes. Our automated segmentation capabilities streamline
                workflow, allowing doctors to focus more on patients and less on paperwork.
              </Typography>
            </CardContent>
          </Card>
        </Slide>
      </Grid>
      {/* Repeat for other cards */}
      <Grid item xs={12} sm={6}>
        <Slide direction="up" in={true} timeout={1100}>
          <Card style={{ backgroundColor: orange[200], margin: 'auto' }}>
            <CardHeader
              avatar={<Group style={{ color: orange[800], width: 56, height: 56 }} />}
              titleTypographyProps={{ variant: 'h4', fontWeight: 'bold', color: orange[800] }}
              title="Collaborative Decision-Making"
            />
            <CardContent>
              <Typography variant="body1">
                Doctors can easily accept or reject segmentations, providing valuable insights and improving diagnostic
                accuracy. Real-time collaboration features enable seamless communication and feedback.
              </Typography>
            </CardContent>
          </Card>
        </Slide>
      </Grid>
    </Grid>
  );
}

export default ContentSection;
