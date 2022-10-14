import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./Footer";
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
// import Container from '@mui/material/Container';

function Layout() {
  let navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const pageTitle = useSelector((state) => state.filter.pageTitle);
  // const [value, setValue] = useState(0)
  return (
    <>
      

      <Navbar />
      
      <Outlet />
      <Footer />
      
    </>
  );
}

export default Layout;
