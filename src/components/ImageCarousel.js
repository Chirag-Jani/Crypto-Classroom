import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Paper, MobileStepper, Button } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: "Image 1",
    imgPath:
      "https://media.istockphoto.com/id/1335295270/photo/global-connection.jpg?s=612x612&w=0&k=20&c=pVIatR8XcihqKTDnISYXNWvSkpZkdeJJa3YNfk9zC6g=",
  },
  {
    label: "Image 2",
    imgPath:
      "https://media.istockphoto.com/id/1335295270/photo/global-connection.jpg?s=612x612&w=0&k=20&c=pVIatR8XcihqKTDnISYXNWvSkpZkdeJJa3YNfk9zC6g=",
  },
];

const ImageCarousel = () => {
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <AutoPlaySwipeableViews
        index={activeStep}
        onChangeIndex={(step) => setActiveStep(step)}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Paper
                square
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: 455,
                  backgroundSize: "cover",
                  backgroundImage: `url(${step.imgPath})`,
                }}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </div>
  );
};

export default ImageCarousel;
