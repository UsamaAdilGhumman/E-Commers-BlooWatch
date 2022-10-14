import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Categories() {
  const [categoryArr, setCategoryArr] = useState([]);

  const getCategoryData = async () => {
    try {
      const categories = await axios.get("http://localhost:5000/category");
       
        const data = await categories.data;
        
    setCategoryArr(data)
      
    } catch (error) {
      console.log(error.message);
    }
  };

  
  useEffect(() => {
    getCategoryData();
    
    return () => {};
  }, []);

  return (
    <>
      <Box textTransform="uppercase" >
        <Typography variant="h5" component="div">
          Categories
        </Typography>
        {categoryArr.map((item) => 
          (
            <>
             <Button key={item.id} sx={{display:"block",borderBottom: '1px solid black', color: "black" }}
               >{item.title}</Button>
            </>
          )
        )}
      </Box>
    </>
  );
}

export default Categories;
