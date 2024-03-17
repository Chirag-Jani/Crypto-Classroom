import React from "react";
import { Box, Typography, Rating, Chip, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";

const ProductDetails = ({
  allCourses,
  CCRManagerABI,
  CCRManagerAddress,
  CCRTokenAddress,
  CCRTokenABI,
}) => {
  const { id } = useParams();
  const course = allCourses?.find((c) => c.uid === id);

  const handleEnrollCourse = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CCRManagerAddress,
        CCRManagerABI,
        signer
      );

      // Determine the payment method based on _payWithMatic
      const transaction = await contract.enrollCourse(
        course.uid,
        5,
        5,
        false // Pass true or false based on the payment method
      );

      // Wait for the transaction to be mined
      await transaction.wait();

      console.log("Enrollment successful");
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <video
        width="100%"
        height="315"
        src={course.videoLink}
        controls
        title="Course Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></video>
      <Typography variant="h4" sx={{ mt: 2 }}>
        {course.uid?.slice(0, 5)}...{course.uid?.slice(course.uid?.length - 3)}
      </Typography>
      <Typography variant="subtitle1">Creator: {course.creator}</Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Price in Matic: {course.priceInMatic.toString()}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Status: {course.status}
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Tag:{" "}
        <Chip
          label={course.tag}
          variant="outlined"
          color="primary"
          size="small"
          sx={{ ml: 1 }}
        />
      </Typography>
      <Typography variant="body1" sx={{ mt: 1 }}>
        Video Link: {course.videoLink}
      </Typography>
      <Rating name="read-only" value={4} readOnly sx={{ mt: 1 }} />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={handleEnrollCourse}
        sx={{ mt: 2 }}
      >
        Enroll in Course
      </Button>
    </Box>
  );
};

export default ProductDetails;
