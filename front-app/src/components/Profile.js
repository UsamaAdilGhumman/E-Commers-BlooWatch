import {
  Avatar,
  Button,
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToken } from "../features/auth";
import { addPageTitle } from "../features/filter";
import EditIcon from "@mui/icons-material/Edit";
import images from "../images";
import { toast } from "react-toastify";

function Profile() {
  const userData = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const history = useNavigate();

  const headers = {
    authorization: `Bearer ${token}`,
  };
  const getData = async () => {
    try {
      const res = (
        await axios.get("http://localhost:5000/user/loggeduser", { headers })
      ).data;
      // console.log(res.status);

      if (res.status === "failed") {
        history("/login");
      } else {
        console.log(res);
        const { user } = res;
        setUser(user);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
    dispatch(addPageTitle("Profile"));
  }, []);
  const handleLogOut = () => {
    localStorage.removeItem("myToken");
    history("/login");
  };
  const [user, setUser] = useState("");
  // const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false);
  const handleImage = async (e) => {
    console.log("image");
    e.preventDefault();
    const name = e.target.name;
    console.log(name);
    console.log(e.target.files[0])
    //setImage({ ...image, [name]: e.target.files });
    try {
      const formdata = new FormData();
      formdata.append("pic",e.target.files[0])
      setLoading(true);
      const res = await axios.post(
        `http://localhost:5000/user/UpdateProfile/${userData.id}`,formdata
      );
      if(res.data.status=="success"){
        setLoading(false);
        getData();
      }else{
        setLoading(false);
        const notify = toast(res.data.message, {
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
  };
  // console.log(image);
  return (
    <>
      {/* {JSON.stringify(user)} */}
      {/* {dispatch(addPageTitle('Profile'))} */}
      {
        loading ? 
        <img src={images.loading} alt="loading-img" />
        :
        (  
      <Grid container spacing={2} sx={{ m: 5 }}>
        <Grid xs={5}>
          <Box>
            <Avatar
              alt={user.name}
              src={user.profilePic}
              sx={{ width: 400, height: 400 }}
            />
          </Box>
        </Grid>
        <Grid xs={4}>
          <Box sx={{ mt: 10 }}>
            <Typography>Name: {user.name}</Typography>
            <Typography sx={{ mt: 5 }}>Email: {user.email}</Typography>
            <Typography sx={{ mt: 5 }}>
              <Button variant="contained" component="label"  >
                Upload Profile Picture
                <input hidden accept="image/*" multiple type="file" 
                onChange={handleImage}
                name="pic"
                />
              </Button>
              {/* <Link to="/changePassword">
                <Button variant="contained">Change Password</Button>
              </Link> */}

              <Button variant="contained" onClick={handleLogOut} sx={{ ml: 3 }}>
                Log Out
              </Button>
            </Typography>
          </Box>
        </Grid>
      </Grid>
      )
    }
    </>
  );
}

export default Profile;
