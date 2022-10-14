import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";
import NewCategory from "../components/NewCategory";
import { useSelector,useDispatch } from "react-redux";
import {addPageTitle} from '../features/filter'
import images from "../images";

function ShopDb() {
  const dispatch = useDispatch();
  const [deleteSubmit, setDeleteSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleDelete = async(id)=>{
    console.log(id);
    setLoading(true);
    try {

      const res = await axios.delete(`http://localhost:5000/product/deleteProduct/${id}`);
      console.log(res)
      if(res.data.status == 'Success'){
        setLoading(false);
        getProductData();
      }else{
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
    // getProductData();
  }
  const [productArr, setProductArr] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  console.log(user);
  const getProductData = async () => {
    try {
      const res = await (
        await axios.get(`http://localhost:5000/product/${user.id}/products`, {
          headers,
        })
      ).data;
      setProductArr(res);
    } catch (error) {
      console.log(error.message);
    }
  };
  const history = useNavigate();
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
    getProductData();
    return () => {};
  }, []);
  dispatch(addPageTitle("Products"));
  return (
    <>
      {
        loading ? 
        (
          <img src={images.loading} alt="Loading-img" />
        )
        :
        (

        
      <Grid container spacing={2} sx={{ mt: 3 }}>
        <Paper elevation={20}>
          <Grid item lg={12}>
            <Box sx={{ width: "90vw", p: 3 }}>
              <Typography variant="h4" sx={{ display: "inline-block" }}>
                Products
              </Typography>
              <Link to="/newProduct">
                <Button sx={{ float: "right" }} variant="contained">
                  Add Products
                </Button>
              </Link>
            </Box>
          </Grid>
          <Grid item lg={12}>
            <Box sx={{ width: "90vw", p: 3 }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Title</TableCell>
                      <TableCell align="center">Stock Limit</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center">Draft</TableCell>

                      <TableCell align="center">Picture</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productArr.map((element) => {
                      return (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{element.title}</TableCell>
                          <TableCell align="center">
                            {element.stock_limit}
                          </TableCell>
                          <TableCell align="center">{element.price}</TableCell>
                          <TableCell align="center">
                            {element.isdraft}
                          </TableCell>

                          <TableCell align="center">
                            <img
                              src={element?.pictures[0]}
                              alt="product-imag"
                              width="100px"
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Box>
                              {/* <Link to={`/editProduct/${element.id}`}>
                                <Button
                                  variant="contained"
                                  color="success"
                                  startIcon={<ModeEditOutlineOutlinedIcon />}
                                  sx={{ mr: 2 }}
                                >
                                  Edit
                                </Button>
                              </Link> */}
                              <Button
                                variant="contained"
                                color="error"
                                startIcon={<DeleteOutlineOutlinedIcon />}
                                onClick={()=>handleDelete(element.id)}
                              >
                                Delete
                              </Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
        </Paper>
      </Grid>
      )
    }
    </>
  );
}

export default ShopDb;
