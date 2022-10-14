import React from "react";
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
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {addPageTitle } from '../features/filter';

function OrderHistory() {
  const user = useSelector((state) => state.auth.user);
  // const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  let dispatch  = useDispatch();

  const headers = {
    authorization: `Bearer ${token}`,
  };
    const handleChange = (e, val) => {
        // console.log(val);
        setValue(val);
      };
      const [value, setValue] = useState(0);

    const [completeData, setCompleteData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const getOrderCompleteData = async () => {
    try {
      const res = await (
        await axios.get(`http://localhost:5000/order/Complete/${user.id}`,{headers})
      ).data;
      console.log(res);
      res.map((obj) => {
        // console.log(obj);
        obj.products.pictures = obj.products.pictures.split(",");
      });
      setCompleteData(res);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getOrderPendingData = async () => {
    try {
      const res = await (
        await axios.get(`http://localhost:5000/order/Pending/${user.id}`,{headers})
      ).data;
      console.log(res);
      res.map((obj) => {
        // console.log(obj);
        obj.products.pictures = obj.products.pictures.split(",");
      });
      setPendingData(res);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    // getData();
    getOrderCompleteData();
    getOrderPendingData();
    dispatch(addPageTitle('Payment History'))
  }, []);
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Completed" />
          <Tab label="Pending" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box sx={{ width: "90vw", p: 3 }}>
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
                {completeData.map((element) => {
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
                          <Link to={`/review/${user.id}/${element?.productId}`}>
                            <Button
                              variant="contained"

                              // onClick={()=>handleDelete(element.id)}
                            >
                              Add Review
                            </Button>
                          </Link>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box sx={{ width: "90vw", p: 3 }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="center">Picture</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingData.map((element) => {
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
                      <TableCell align="center">Pending</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </TabPanel>
    </>
  );
}
const TabPanel = (props) => {
    const { children, value, index } = props;
    // console.log(props);
    return <>{value == index ? <h1>{children}</h1> : null}</>;
  };

export default OrderHistory;
