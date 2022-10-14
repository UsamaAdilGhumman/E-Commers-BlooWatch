import React, { useEffect, useState } from "react";
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
import { useSelector,useDispatch } from "react-redux";
import {addPageTitle} from '../features/filter'

function Orders() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const headers = {
    authorization: `Bearer ${token}`,
  };
  const [orderData, setOrderData] = useState([]);
  const handleComplete = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/order/OrderComplete/${id}`,{headers});
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getOrderData = async () => {
    try {
      const res = await (
        await axios.get("http://localhost:5000/order/OrderData",{headers})
      ).data;
      console.log(res);
      res.map((obj) => {
        // console.log(obj);
        obj.products.pictures = obj.products.pictures.split(",");
      });
      setOrderData(res);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getOrderData();

    return () => {};
  }, []);
  dispatch(addPageTitle("Orders"));
  return (
    <>
      <Box sx={{ width: "90vw", p: 3 }}>
        <Typography variant="h4" sx={{ display: "inline-block" }}>
          Orders
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>

                <TableCell align="center">Picture</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orderData.map((element) => {
                return (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>{element?.products?.title}</TableCell>
                    <TableCell align="center">
                      <img
                        src={element?.products?.pictures[0]}
                        alt="product-imag"
                        width="100px"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box>
                        <Button
                          variant="contained"
                          // startIcon={<DeleteOutlineOutlinedIcon />}
                          onClick={() => handleComplete(element.id)}
                        >
                          Complete
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
    </>
  );
}

export default Orders;
