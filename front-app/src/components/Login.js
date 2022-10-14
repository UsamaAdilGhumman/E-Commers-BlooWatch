import React, { useState } from "react";
import { Avatar, Button, Grid, Paper, TextField } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToken,addUser } from "../features/auth";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const userData = useSelector((state) => state.auth.user);
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  // console.log(userData);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    setuser({ ...user, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = (await axios.post("http://localhost:5000/user/login", user))
        .data;
        // console.log(message);
        if(message.status == "success"){
          localStorage.setItem('myToken',message.token)
         dispatch(addToken(message.token))
        //  console.log(message.user);
         dispatch(addUser(message.user))
         if(message.user.isShop){
          history("/shopdb")
        }else{
          history("/userdb")
        }
        }else{
          const notify = toast(message.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          notify();
        }
        
       
    } catch (error) {
      console.log(error.message);
    }

    // console.log(userData);
    






  };
  const paperStyle = {
    padding: "30px 20px",
    width: 500,
    margin: "50px auto",
  };
  const headerStyle = {
    margin: 0,
  };
  let location = useLocation();
  console.log(location);
  return (
    <>
      {/* {token} */}
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Avatar sx={{ width: 80, height: 80 }}></Avatar>
            <h2 style={headerStyle}>Login</h2>
          </Grid>
          <form method="post" onSubmit={handleSubmit}>
            <TextField
              autoComplete="off"
              required
              label="Email"
              fullWidth
              type="email"
              sx={{ mt: 2, mb: 2 }}
              name="email"
              onChange={handleChange}
            />
            <TextField
              autoComplete="off"
              required
              label="Password"
              fullWidth
              type="password"
              sx={{ mt: 2, mb: 2 }}
              name="password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, mb: 2 }}
              onClick={handleSubmit}
            >
              Login
            </Button>
          </form>
          <Link to="/signup">
            <Button variant="text" sx={{ mt: 4, mb: 2 }}>
              Create An Account
            </Button>
          </Link>
        </Paper>
      </Grid>
    </>
  );
}

export default Login;
