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
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { SettingsBluetoothSharp } from "@mui/icons-material";
import images from "../images";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToken,addUser } from "../features/auth";

const type = [
  {
    value: "1",
    label: "Shop",
  },
  {
    value: "0",
    label: "Customer",
  },
];

const SignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    profilePic: "",
    isShop: "",
  });
  const [userErr, setUserErr] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [fromErrors, setfromErrors] = useState(user);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value);
    setUser({ ...user, [name]: value });
  };
  const handleImage = (e) => {
    // console.log("hello world!");
    // console.log(e.target.files[0]);
    setUser({ ...user, profilePic: e.target.files[0] });
    //console.log(image);
  };
  // console.log(user)
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(user.profilePic);
    // console.log(user.profilePic.name)

    // if (user.password === user.cpassword) {
    setfromErrors(validateDate(user));
    setIsSubmit(true);
    setLoading(true);
    // }else{

    // }
  };
  
  const addData = async () => {
    const formData = new FormData();
    formData.append("profilePic", user.profilePic);
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("cpassword", user.cpassword);
    formData.append("password", user.password);
    formData.append("isShop", user.isShop);

    // console.log(user);
    try {
      const message = await axios.post(
        "http://localhost:5000/user/register",
        formData
      );
      //alert(message.data)
      console.log(message);
      // console.log(message);
      if (message.data.status === "Success") {
        setLoading(false);
        
          localStorage.setItem('myToken',message.data.token)
         dispatch(addToken(message.data.token))
        //  console.log(message.user);
         dispatch(addUser(message.data.user))
         if(message.data.user.isShop){
          history("/shopdb")
        }else{
          history("/userdb")
        }
        
      } else {
        setLoading(false);
        // history("/newProduct");
        const notify = toast(message.data.message, {
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
        // setUserErr("User Already Exist");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (Object.keys(fromErrors).length === 0 && isSubmit) {
      addData();
    }
  }, [fromErrors]);

  const validateDate = (value) => {
    const errors = {};
    if (!value.name) {
      errors.name = "Name is Required";
    }
    if (!value.email) {
      errors.email = "email is Required";
    }
    if (!value.password) {
      errors.password = "Password is Required";
    }
    if (!value.cpassword) {
      errors.cpassword = "confirm Password is Required";
    }
    if (!value.isShop) {
      errors.isShop = "Account Type is Required";
    }
    if (!value.profilePic) {
      errors.profilePic = "Profile Picture is Required";
    }
    if (value.password !== value.cpassword) {
      errors.notmatch = "Password not Match";
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

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
      {/* {
      userErr ?
      <Alert severity="error">{userErr}</Alert> : null
    } */}
      {loading ? (
        <>
        <img src={images.loading} alt="Loading-img" />
        </>
      ) : (
        <Grid>
          <Paper elevation={20} style={paperStyle}>
            <Grid align="center">
              <Avatar sx={{ width: 80, height: 80 }}></Avatar>
              <h2 style={headerStyle}>Sign Up</h2>
              <Typography variant="caption" gutterBottom>
                Please fill this form to create an account!
              </Typography>
            </Grid>
            <form method="post" onSubmit={handleSubmit}>
              <TextField
                autoComplete="off"
                required
                label="Name"
                fullWidth
                type="text"
                sx={{ mt: 2, mb: 2 }}
                onChange={handleChange}
                name="name"
              />
              {fromErrors.name ? (
                <Alert severity="error">{fromErrors.name}</Alert>
              ) : null}
              <TextField
                autoComplete="off"
                required
                label="Email"
                fullWidth
                type="email"
                sx={{ mt: 2, mb: 2 }}
                onChange={handleChange}
                name="email"
              />
              {fromErrors.email ? (
                <Alert severity="error">{fromErrors.email}</Alert>
              ) : null}
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
              {fromErrors.password ? (
                <Alert severity="error">{fromErrors.password}</Alert>
              ) : null}
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
              {fromErrors.cpassword ? (
                <Alert severity="error">{fromErrors.cpassword}</Alert>
              ) : null}
              {fromErrors.notmatch ? (
                <Alert severity="error">{fromErrors.notmatch}</Alert>
              ) : null}
              <Typography sx={{ mt: 2, mb: 2 }}>
                <input accept="image/*" type="file" onChange={handleImage} />
              </Typography>
              {fromErrors.profilePic ? (
                <Alert severity="error">{fromErrors.profilePic}</Alert>
              ) : null}
              <TextField
                select
                label="Select"
                value={user.isShop}
                onChange={handleChange}
                helperText="Please select Account type"
                fullWidth
                sx={{ mt: 2, mb: 2 }}
                name="isShop"
              >
                {type.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {fromErrors.isShop ? (
                <Alert severity="error">{fromErrors.isShop}</Alert>
              ) : null}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
            </form>
            {userErr ? <Alert severity="error">{userErr}</Alert> : null}
            <Typography sx={{ mt: 2 }} align="center">
              Already have an account?{" "}
              <Link to="/login">
                <Button variant="text">Login here</Button>
              </Link>
            </Typography>
          </Paper>
        </Grid>
      )}
    </>
  );
};

export default SignUp;
