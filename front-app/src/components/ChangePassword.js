import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Alert,
  AlertTitle,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

function ChangePassword() {
  const token = useSelector((state) => state.auth.token);
  const headers = {
    authorization: `Bearer ${token}`,
  }

  const [password, setPassword] = useState({
    password: "",
    cpassword: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.password !== password.cpassword) {
      console.log("password not match");
    } else {
      const pass = password.password;
      console.log(pass);
      try {
        const res = await axios.post("http://localhost:5000/changePassword", {pass},{headers});
        console.log(res.data);
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  // useEffect
  const paperStyle = {
    padding: "30px 20px",
    width: 500,
    margin: "40px auto",
  };
  const headerStyle = {
    margin: 0,
  };
  return (
    <>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <h2 style={headerStyle}>Change Password</h2>
          </Grid>
          <form method="post" onSubmit={handleSubmit}>
            <TextField
              autoComplete="off"
              required
              label="Password"
              fullWidth
              type="password"
              sx={{ mt: 2, mb: 2 }}
              onChange={handleChange}
              name="password"
            />
            {/* {fromErrors.password ? (
              <Alert severity="error">{fromErrors.password}</Alert>
            ) : null} */}
            <TextField
              autoComplete="off"
              required
              label="Confirm Password"
              fullWidth
              type="password"
              sx={{ mt: 2, mb: 2 }}
              onChange={handleChange}
              name="cpassword"
            />
            {/* {fromErrors.cpassword ? (
              <Alert severity="error">{fromErrors.cpassword}</Alert>
            ) : null}
            {fromErrors.notmatch ? (
              <Alert severity="error">{fromErrors.notmatch}</Alert>
            ) : null} */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Change Password
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
}

export default ChangePassword;
