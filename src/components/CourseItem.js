import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
  Rating,
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
      <CardMedia
        component="img"
        height="140"
        image={course.image}
        alt={course.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {course.author}
        </Typography>
        <Rating
          sx={{ marginTop: 1, marginLeft: -0.4 }}
          name="read-only"
          value={course.rating}
          readOnly
        />
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
        <Typography variant="body2" color="text.primary">
          {course.price}
        </Typography>
        <Button component={Link} to={`/product/${course.id}`} sx={{}} size="small" variant="contained" color="primary">
          Enroll Now
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default CourseItem;
