import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { addPageTitle } from "../features/filter";
import CloseIcon from "@mui/icons-material/Close";
import "../cartStyle.css";
import images from "../images";
import { toast } from "react-toastify";
import { addItem, deleteItem, clearItem } from "../features/cart";

function Cart() {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  const token = useSelector((state) => state.auth.token);
  const cart = useSelector((state) => state.cart.cart);
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [applyCoupan, setApplyCoupan] = useState(false);
  const [coupanButton, setCoupanButton] = useState(false);
  const [coupan, setCoupan] = useState("");
  let dispatch = useDispatch();
  const headers = {
    authorization: `Bearer ${token}`,
  };
  const [cartItems, setCartItems] = useState([]);
  const [price, setPrice] = useState("");
  const handleDelete = async (id) => {
    console.log(id);
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/order/Carts/${user.id}`,
        { id },
        { headers }
      );
      console.log(res);
      if (res.data.status == "success") {
        setLoading(false);
        getCartData();
        dispatch(deleteItem());
      } else {
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
        getCartData();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleUp = async (product) => {
    console.log(product);
    const productId = product.productId;

    try {
      const order = await axios.post(
        `http://localhost:5000/order/OrderUp/${user.id}`,
        {
          productId,
        },
        { headers }
      );
      getCartData();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDown = async (product) => {
    console.log(product);
    const productId = product.productId;

    try {
      const order = await axios.post(
        `http://localhost:5000/order/OrderDown/${user.id}`,
        {
          productId,
        },
        { headers }
      );
      getCartData();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handlebuy = async () => {
    console.log('abcdef');
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/order/buy/${user.id}`,
        { price },
        { headers }
      );
      console.log(res);
      if (res.data.status == "success") {
        setLoading(false);
        getCartData();
        dispatch(clearItem());
      } else {
        setLoading(false);
        getCartData();
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
  const getCartData = async () => {
    try {
      const cartData = await (
        await axios.get(`http://localhost:5000/order/Carts/${user.id}`, {
          headers,
        })
      ).data;
      // console.log(cartData);
      // const myArray = cartData?.products?.pictures.split(',');
      // console.log(myArray);
      // const pics = cartData?.products?.pictures.split(',');
      // console.log(pics);
      // console.log(cartData);
      let myprice = 0;
      // let quantity = 0;
      cartData.map((obj) => {
        // console.log(obj);
        // setCoupanButton(true);
        obj.products.pictures = obj.products.pictures.split(",");

        myprice = obj.products.price * obj.quantity + myprice;
      });
      setPrice(myprice);
      // setQuantity(cartData.quantity)
      setCartItems(cartData);
      // if(cartData.length>0){
      //   setCoupanButton(true);
      // }
      console.log(cartData);
    } catch (error) {
      console.log(error.message);
    }
  };
  const [disableButton, setDisableButton] = useState(false);
  useEffect(() => {
    getCartData();
    dispatch(addPageTitle("Cart"));
    return () => {};
  }, []);
  const handleCoupan = (e) => {
    if (coupan <= 10 && coupan >= 1) {
      const pre = (coupan / 100) * price;
      setPrice(pre);
      setDisableButton(true);
    } else {
      const notify = toast("Coupan is Not Valid", {
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
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCoupan(value);
  };
  return (
    <>
      {loading ? (
        <img src={images.loading} alt={"loading img"} />
      ) : (
        <div className="cart_div">
          <div>
            <Box sx={{ width: "90vw", p: 3 }}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="center">Product</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center">Quantity</TableCell>
                      <TableCell align="center">SubTotal</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems
                      ? Array.from(cartItems).map((item) => {
                          return (
                            <>
                              <TableRow>
                                <TableCell>
                                  <Button
                                    onClick={(e) => handleDelete(item.id)}
                                  >
                                    <CloseIcon />
                                  </Button>
                                </TableCell>
                                <TableCell align="center">
                                  <div className="cart_product_div">
                                    <img
                                      className="product_img_div"
                                      src={item?.products?.pictures[0]}
                                      alt="swining-suit"
                                    />
                                  </div>
                                  <div className="product_title">
                                    {item?.products?.title}
                                  </div>
                                </TableCell>
                                <TableCell align="center">
                                  {item?.products?.price}
                                </TableCell>
                                <TableCell align="center">
                                  <div>
                                    <div className="quan_num">
                                      {item?.quantity}
                                    </div>
                                    <div>
                                      <div className="up__arraw">
                                        <Button onClick={(e) => handleUp(item)}>
                                          <KeyboardArrowUpIcon />
                                        </Button>
                                      </div>
                                      <div className="down__arraw">
                                        <Button
                                          onClick={(e) => handleDown(item)}
                                        >
                                          <KeyboardArrowDownIcon />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell align="center">
                                  {item?.products?.price * item?.quantity}
                                </TableCell>
                              </TableRow>
                            </>
                          );
                        })
                      : null}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </div>
          <div>
            <div style={{ margin: "10px" }}>
              {applyCoupan ? (
                <>
                  <TextField
                    autoComplete="off"
                    required
                    label="Coupan"
                    type="number"
                    sx={{ mt: 2, mb: 2 }}
                    onChange={handleChange}
                    name="Coupan"
                  />
                  <Button
                    variant="contained"
                    onClick={handleCoupan}
                    sx={{ m: 3 }}
                    disabled={disableButton}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    onClick={(e) => setApplyCoupan(false)}
                    sx={{ m: 3 }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  variant="contained"
                  onClick={(e) => setApplyCoupan(true)}
                  sx={{ m: 3 }}
                >
                  Apply Coupan
                </Button>
              )}
            </div>
          </div>
          <div>
            <div>Cart Total</div>
            <div className="total_div">
              <div>Total</div>
              <div style={{ marginLeft: 200 }}>{price}</div>
            </div>
            <div style={{ marginTop: 40 }}>
              <Button variant="contained" onClick={handlebuy} sx={{ m: 3 }}>
                Proceed to checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
