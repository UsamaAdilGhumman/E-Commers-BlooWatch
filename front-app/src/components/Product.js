import {
  Avatar,
  Button,
  Grid,
  Rating,
  Tab,
  Tabs,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import cartInfo from "./cardInfo";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../features/cart";
import { useNavigate, useParams } from "react-router-dom";
import { addPageTitle } from "../features/filter";

let counter = 0;
function Product() {
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const products = useSelector((state) => state.products.productsList);

  // const history = useNavigate();

  const headers = {
    authorization: `Bearer ${token}`,
  };
  const { productId } = useParams();
  // console.log(cardInfo);
  // const cart = useSelector(state=>state.cart.cart)
  // const quantity = useSelector(state=>state.cart.quantity)
  const item = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [pictures, setPictures] = useState([]);
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [img4, setImg4] = useState("");
  const [img5, setImg5] = useState("");
  const [img6, setImg6] = useState("");
  const [count, setCount] = useState(counter);
  const [value, setValue] = useState(0);
  const [review, setReview] = useState([]);
  const handleCart = async (e) => {
    const productId = product.id;
    const status = "incomplete";
    let quantity;
    if (count == 0) {
      quantity = 1;
    } else {
      quantity = count;
    }
    const price = product.price;

    try {
      const order = await axios.post(
        `http://localhost:5000/order/Order/${user.id}`,
        {
          status,
          productId,
          quantity,
          price,
        },
        { headers }
      );
      if (order.data.Item) {
        dispatch(addItem());
      }
    } catch (error) {
      console.log(error.message);
    }
    // const item = cart.find(obj=>obj == product);
    // // console.log(item);
    // if(!item){
    //   if(count == 0){
    //     product.quantity = 1;
    //     dispatch(addItem(product))
    //   }else{
    //     product.quantity = count;
    //     dispatch(addItem(product))
    //   }
    // }else{
    //   // console.log(item.quantity);
    //   const quantity = item.quantity;
    //   product.quantity = quantity+count;
    //   console.log(product);
    //   // product.quantity = item?.quantity+count
    //   // dispatch(addItem(product))
    // }
  };
  const handleChange = (e, val) => {
    // console.log(val);
    setValue(val);
  };
  const handleUp = () => {
    counter++;
    setCount(counter);
  };
  const handleDown = () => {
    if (counter <= 0) {
      counter = 0;
    } else {
      counter--;
    }
    setCount(counter);
  };
  const handleClick = (e) => {
    setImg6(e.target.src);
  };
  const getData = async () => {
    // products.filter(item);
    // const item = (productId)=>{
    //   return productId === item.id
    // }

    // products.find(item=>{

    // })

    // products.filter((item) => {
    //   if (item.id == productId) {
    //     console.log(item.pictures);
    //     setProduct(item);
    //     setPictures(item.pictures);
    //     setImg6(item.pictures[2]);
    //   } else {
    //     console.log("No Product Found");
    //   }
    //   return item;
    //   // console.log(typeof(item.id));
    //   // console.log(typeof(productId));
    // });

    // console.log(myProduct.pictures)
    // setPictures(myProduct);

    try {
      const res = await (
        await axios.get(`http://localhost:5000/product/product/${productId}`,{headers})
      ).data;
      // console.log(res);

      setProduct(res);
      setPictures(res.pictures);
      setImg6(res.pictures[2]);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await (
          await axios.get(`http://localhost:5000/review/Reviews/${productId}`, {
            headers,
          })
        ).data;
        console.log(res);
        setReview(res);
      } catch (error) {
        console.log(error.message);
      }
    };

    getData();
    getReviews();
    // console.log(pictures);

    return () => {};
  }, []);
  dispatch(addPageTitle(product.title));
  return (
    <>
      {/* {
      JSON.stringify(item)
    } */}
      {/* {
      JSON.stringify(quantity)
    } */}
      <Grid container spacing={2}>
        <Grid item lg={7}>
          <Grid container spacing={3}>
            <Grid item lg={2}>
              <Box sx={{ ml: 3 }}>
                {
                  // pictures.map(item=>{
                  //   console.log(item);
                  // })

                  pictures.map((item) => {
                    console.log(item);
                    return (
                      <>
                        <img
                          src={item}
                          alt="imgs"
                          width={100}
                          onClick={handleClick}
                        />
                      </>
                    );
                  })
                }
                {/* <img src={img1} alt="img-0" width={100} onClick={handleClick} />
                <img src={img2} alt="img-1" width={100} onClick={handleClick} />
                <img src={img3} alt="img-2" width={100} onClick={handleClick} />
                <img src={img4} alt="img-3" width={100} onClick={handleClick} />
                <img src={img5} alt="img-4" width={100} onClick={handleClick} /> */}
              </Box>
            </Grid>
            <Grid item lg={8}>
              <Box>
                <img
                  src={img6}
                  alt="img-4"
                  width={500}
                  style={{ maxHeight: "500px" }}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={4}>
          <Box sx={{ m: 4 }}>Title: {product.title}</Box>
          <Box sx={{ m: 4 }}> Price: {product.price}</Box>
          <Box sx={{ m: 4 }}>Description: {product.description}</Box>
          <Box>
            <Box>
              {count}
              <KeyboardArrowUpIcon
                style={{
                  position: "relative",
                  left: "30px",
                }}
                onClick={handleUp}
              />
              <KeyboardArrowDownIcon
                style={{
                  position: "relative",
                  top: "20px",
                }}
                onClick={handleDown}
              />
              <Button
                sx={{ border: "1px solid black", color: "black", ml: 10 }}
                onClick={handleCart}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
          <Box sx={{ m: 4 }}>Category: {product.categories?.title}</Box>
        </Grid>
      </Grid>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Description" />
          <Tab label="Reviews" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <p style={{ fontSize: "20px", textDecoration: "none" }}>
          {product.description}
        </p>
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* {
          JSON.stringify(review)
        } */}
        {review.map((item) => {
          // console.log(item);
          return (
            <>
              <Box>
                <Box>
                  <Avatar
                    alt="Image"
                    src={item?.users?.profilePic}
                    sx={{ width: 56, height: 56, display: "inline-block" }}
                  />
                  <Typography variant="p">{item?.users?.name}</Typography>
                </Box>
                <Box>
                  <Rating name="read-only" value={item.rating} readOnly />
                </Box>
                <Box>
                  <Typography variant="p">{item?.comment}</Typography>
                </Box>
              </Box>
            </>
          );
        })}
      </TabPanel>
    </>
  );
}

const TabPanel = (props) => {
  const { children, value, index } = props;
  // console.log(props);
  return <>{value == index ? <h1>{children}</h1> : null}</>;
};

export default Product;
