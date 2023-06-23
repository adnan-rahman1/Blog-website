import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import { useEffect, useState } from "react";
import { getProjects } from "../../../../api/Project";
import { useDispatch, useSelector } from "react-redux";
import { showLoading } from "../../../../redux/actions/notificationAction";

import SwipeableViews from "react-swipeable-views";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import SingleProject from "../SingleProject";

const ProjectList = () => {
  const { simpleLoading } = useSelector((rs) => rs.notificationReducer);
  const theme = useTheme();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    projects: [],
  });

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = state.projects.length;
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const getAllProject = async () => {
    dispatch(showLoading({ simpleLoading: true }));
    const res = await getProjects();
    if (res.status == 200) {
      setState({ ...state, projects: res.data });
      dispatch(showLoading({ simpleLoading: false }));
    } else if (res.status == 400) {
      setState({ ...state, msg: res.data.message });
      dispatch(showLoading({ simpleLoading: false }));
    }
  };

  useEffect(getAllProject, []);

  return (
    <>
      {!simpleLoading && state.projects.length > 0 && (
        <>
          <MobileStepper
            style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            steps={0}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                style={{ backgroundColor: "inherit" }}
                color="secondary"
                variant="text"
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                style={{ backgroundColor: "inherit" }}
                color="secondary"
                variant="text"
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
          {!simpleLoading && state.projects.length > 0 && (
            <SwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
              {state.projects.map((project) => (
                <SingleProject key={project.id} project={project} />
              ))}
            </SwipeableViews>
          )}
        </>
      )}
      {!simpleLoading && state.projects.length <= 0 && (
        <Typography
          sx={{
            marginTop: "40vh",
            textAlign: "center",
            opacity: 0.3,
          }}
          variant="h4"
        >
          NOT FOUND
        </Typography>
      )}
    </>
  );
};

export default ProjectList;
