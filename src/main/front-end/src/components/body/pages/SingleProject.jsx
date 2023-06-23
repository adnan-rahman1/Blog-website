import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Fade from "@mui/material/Fade";
import { useTheme } from "@mui/material/styles";

import { useState } from "react";
import notfound from "../../../assets/notfound.svg";

import SwipeableViews from "react-swipeable-views";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import IconButton from "@mui/material/IconButton";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const SingleProject = ({ project }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = project.pictures.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Fade in={true} key={project.id} timeout={300}>
      <Grid container alignItems="center" sx={{ minHeight: "80vh" }} justifyContent="space-evenly">
        <Grid item xs={12} sm={12} md={10} lg={5}>
          <Card
            elevation={0}
            sx={{
              background: "rgba(0, 0, 0, 0)",
              [theme.breakpoints.down("md")]: {
                borderRadius: 0,
              },
            }}
          >
            {project.pictures.length > 0 && (
              <SwipeableViews
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {project.pictures.map((picture) => (
                  <Fade timeout={300} key={picture.id} in={true}>
                    <CardMedia
                      style={{
                        maxHeight: "450px",
                        width: "auto",
                        margin: "auto",
                      }}
                      component="img"
                      alt="Not Found"
                      image={[picture.location, picture.name].join("/")}
                      onError={(event) => {
                        event.target.src = notfound;
                        event.onerror = null;
                      }}
                    />
                  </Fade>
                ))}
              </SwipeableViews>
            )}
            {project.pictures.length > 1 && (
              <CardActions>
                <MobileStepper
                  style={{ margin: "auto", backgroundColor: "inherit" }}
                  steps={maxSteps}
                  position="static"
                  activeStep={activeStep}
                  nextButton={
                    <IconButton
                      disableRipple
                      color="secondary"
                      onClick={handleNext}
                      disabled={activeStep === maxSteps - 1}
                    >
                      {theme.direction === "rtl" ? (
                        <KeyboardArrowLeft />
                      ) : (
                        <KeyboardArrowRight />
                      )}
                    </IconButton>
                  }
                  backButton={
                    <IconButton
                      disableRipple
                      color="secondary"
                      onClick={handleBack}
                      disabled={activeStep === 0}
                    >
                      {theme.direction === "rtl" ? (
                        <KeyboardArrowRight />
                      ) : (
                        <KeyboardArrowLeft />
                      )}
                    </IconButton>
                  }
                />
              </CardActions>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} sm={11} md={10} lg={5}>
          <Card
            elevation={0}
            sx={{
              background: "rgba(0, 0, 0, 0)",
              border: 0,
              marginBottom: "16px",
            }}
            variant="elevation"
          >
            <CardHeader
              title={
                <Typography variant="h5" color="secondary">
                  {project.name}
                </Typography>
              }
            />
            <CardContent style={{ paddingTop: 0 }}>
              <Typography
                variant="subtitle1"
                fontSize={18}
                style={{ opacity: 0.8 }}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                >
                  {project.description}
                </ReactMarkdown>
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Link</TableCell>
                    <TableCell align="right">Technology</TableCell>
                    <TableCell align="right">Category</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={project.id}>
                    <TableCell align="left">
                      <Link
                        underline="none"
                        href={project.link}
                        target="_blank"
                        color={
                          theme.palette.mode === "dark"
                            ? "secondary"
                            : "primary"
                        }
                      >
                        View Source
                      </Link>
                    </TableCell>
                    <TableCell align="right">
                      {project.tags.length > 0 ? (
                        project.tags.map((p_t) => (
                          <Chip
                            color="primary"
                            style={{
                              margin: 1,
                              borderRadius: "3px",
                            }}
                            key={p_t.id}
                            label={p_t.name}
                          />
                        ))
                      ) : (
                        <Chip
                          color="error"
                          style={{
                            margin: 1,
                            borderRadius: "3px",
                          }}
                          label="No tag"
                        />
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {project.categories.length > 0 ? (
                        project.categories.map((p_c) => (
                          <Chip
                            style={{
                              margin: 1,
                              borderRadius: "3px",
                              color: theme.palette.grey[50],
                              background:
                                theme.palette.mode === "dark"
                                  ? theme.palette.success.dark
                                  : theme.palette.success.light,
                            }}
                            key={p_c.id}
                            label={p_c.name}
                          />
                        ))
                      ) : (
                        <Chip
                          color="error"
                          style={{
                            margin: 1,
                            borderRadius: "3px",
                          }}
                          label="No category"
                        />
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default SingleProject;
