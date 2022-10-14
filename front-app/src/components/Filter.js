import { Box, Button, Slider, TextField, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addSearch,
  addRange,
  addCategory,
  addPageTitle,
} from "../features/filter";

function Filter() {
  const range = useSelector((state) => state.filter.range);
  const dispatch = useDispatch();
  const [categoryArr, setCategoryArr] = useState([]);
  // const [filterValues, setFilterValues] = useState({
  //   search:"",
  //   rating:0,

  // })
  const getCategoryData = async () => {
    try {
      const categories = await axios.get(
        "http://localhost:5000/category/category"
      );

      const data = await categories.data;

      setCategoryArr(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleChange = (e) => {
    //console.log([e.target.name],e.target.value);
    // const filterValue ={
    //   [e.target.name]:e.target.value
    // }
    // (addfilter(filterValue))
  };

  useEffect(() => {
    getCategoryData();

    return () => {};
  }, []);
  return (
    <>
      <Box sx={{ width: "200px" }}>
        <TextField
          autoComplete="off"
          // required
          label="Search"
          fullWidth
          type="Search"
          sx={{ mt: 2, mb: 2 }}
          onChange={(e) => dispatch(addSearch(e.target.value))}
          name="search"
        />
        <input
          type="range"
          min={0}
          max={100}
          // value="50"
          value = {range}
          name="range"
          onChange={(e) => dispatch(addRange(e.target.value))}
          style={{width:"200px"}}
        />
        Price: {range}
        {/* <Slider
          aria-label="Temperature"
          defaultValue={10}
          //   getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          step={10}
          marks
          min={10}
          max={100}
          name="range"
          onChange={(e) => dispatch(addRange(e.target.value))}
        /> */}
        <Box textTransform="uppercase">
          <Typography variant="h5" component="div">
            Categories
          </Typography>
          <ul
          // style={{textDecoration:"none"}}
          >
            {categoryArr.map((item) => {
              const title = item.title;
              return (
                <>
                  <li
                    onClick={(e) => {
                      dispatch(addPageTitle(title));
                      dispatch(addCategory(title));
                    }}
                  >
                    {title}
                  </li>
                </>
              );
            })}
          </ul>
        </Box>
      </Box>
    </>
  );
}

export default Filter;
