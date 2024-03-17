import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  marginBottom: theme.spacing(2),
}));

const CourseItem = ({ course }) => {
  return (
    <StyledCard sx={{ marginLeft: 4, marginTop: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Course ID:{" "}
          <Link
            to={{
              pathname: `/product/${course.uid}`,
              state: { course: course }, // Pass the course object as state
            }}
            style={{ color: "inherit" }}
          >
            {course.uid}
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Creator: {course.creator}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price in Matic: {course.priceInMatic.toString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {course.status}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tag: {course.tag}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Video Link:{" "}
          <a href={course.videoLink} target="_blank" rel="noopener noreferrer">
            {course.videoLink}
          </a>
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: 2,
          paddingLeft: 2,
          paddingBottom: 1.5,
        }}
      >
        <Button
          component={Link}
          to={{
            pathname: `/product/${course.uid}`,
            state: { course: course }, // Pass the course object as state
          }}
          size="small"
          variant="contained"
          color="primary"
        >
          View Details
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default CourseItem;
