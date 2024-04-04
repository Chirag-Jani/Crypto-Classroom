// import React, { useState } from "react";
// import SwipeableViews from "react-swipeable-views";
// import { autoPlay } from "react-swipeable-views-utils";
// import { Box, MobileStepper, Paper, Button } from "@mui/material";
// import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const images = [
//   {
//     label: "Image 1",
//     imgPath:
//       "https://media.istockphoto.com/id/1335295270/photo/global-connection.jpg?s=612x612&w=0&k=20&c=pVIatR8XcihqKTDnISYXNWvSkpZkdeJJa3YNfk9zC6g=",
//   },
//   {
//     label: "Image 2",
//     imgPath:
//       "https://media.istockphoto.com/id/1335295270/photo/global-connection.jpg?s=612x612&w=0&k=20&c=pVIatR8XcihqKTDnISYXNWvSkpZkdeJJa3YNfk9zC6g=",
//   },
// ];

// const ImageCarousel = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const maxSteps = images.length;

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   return (
//     <Box position="relative" width="100%" height={455}>
//       <AutoPlaySwipeableViews
//         index={activeStep}
//         onChangeIndex={(step) => setActiveStep(step)}
//         enableMouseEvents
//       >
//         {images.map((step, index) => (
//           <div key={step.label}>
//             {Math.abs(activeStep - index) <= 2 ? (
//               <Box
//                 component={Paper}
//                 square
//                 elevation={0}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   height: 455,
//                   backgroundSize: "cover",
//                   backgroundImage: `url(${step.imgPath})`,
//                 }}
//               />
//             ) : null}
//           </div>
//         ))}
//       </AutoPlaySwipeableViews>
//       <Box sx={{ position: 'absolute', bottom: 10, left: 0, right: 0 }}>
//         <MobileStepper

//           steps={maxSteps}
//           position="static"
//           activeStep={activeStep}
//           sx={{ background: 'transparent', }}
//           nextButton={
//             <Button
//               size="small"
//               onClick={handleNext}
//               disabled={activeStep === maxSteps - 1}
//               sx={{ color: 'white' }} // Customize color here
//             >
//               Next
//               <KeyboardArrowRight />
//             </Button>
//           }
//           backButton={
//             <Button
//               size="small"
//               onClick={handleBack}
//               disabled={activeStep === 0}
//               sx={{ color: 'white' }} // Customize color here
//             >
//               <KeyboardArrowLeft />
//               Back
//             </Button>
//           }
//         />
//       </Box>
//     </Box>
//   );
// };

// export default ImageCarousel;

import React from "react";

const ImageCarousel = () => {
  return (
    <div>
      <div></div>
    </div>
  );
};

export default ImageCarousel;
