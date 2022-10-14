import { Box, Button, Rating } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Review() {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const headers = {
    authorization: `Bearer ${token}`,
  };
  const {userId,productId} =  useParams();
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const handleReview = async()=>{
    console.log(userId,productId);
    try {
      // console.log(rating);
      // console.log(comment);
      const res = await axios.post(`http://localhost:5000/review/Review/${userId}/${productId}`,{rating,comment},{headers})
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <>
      <Box sx={{ m: 3 }}>
        <Box>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
            // style={{display:"block"}}
          />
        </Box>
        <Box sx={{mt:3}} >
          <input
            type="text"
            name="comment"
            autoComplete="off"
            onChange={(e) => setComment(e.target.value)}
          />
        </Box>
        <Box sx={{mt:3}} >
          <Button
            variant="contained"
            onClick={handleReview}
          >
            Add Review
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Review;
