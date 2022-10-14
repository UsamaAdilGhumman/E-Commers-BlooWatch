import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Products from "../components/Products";
import Categories from "../components/Categories";
import Filter from "../components/Filter";
import NewCategory from "../components/NewCategory";
import {addPageTitle } from '../features/filter';

function Home() {
  let dispatch  = useDispatch();
  const history = useNavigate();
  const token = useSelector((state) => state.auth.token);
  // console.log(token);
  const headers = {
    authorization: `Bearer ${token}`,
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const res = (
          await axios.get("http://localhost:5000/loggeduser", { headers })
        ).data;
        // console.log(res);
        if (res.status === "failed") {
          history("/login");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    // getData();
    dispatch(addPageTitle('Home Page'))
    return () => {};
  }, []);
  // const search = useSelector((state) => state.filter.search);
  // const range = useSelector((state) => state.filter.range);
  // const category = useSelector((state) => state.filter.category);
  // console.log(localStorage.getItem('myToken'));
  return (
    <>
      <Grid container spacing={2} sx={{ mt: 5 }}>
        <Grid item lg={9}>
          <Products />
        </Grid>
        <Grid item lg={3}>
          <Filter />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
