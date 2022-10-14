import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import images from "../images";
import "../products.css";
import { addProducts } from "../features/products";
import { addItem } from "../features/cart";

function Products() {
  const token = useSelector((state) => state.auth.token);
  // const products = useSelector((state) => state.products.productsList);
  let dispatch = useDispatch();
  const headers = {
    authorization: `Bearer ${token}`,
  };
  const search = useSelector((state) => state.filter.search);
  const range = useSelector((state) => state.filter.range);
  const category = useSelector((state) => state.filter.category);
  const user = useSelector((state) => state.auth.user);
  const [productsArr, setProductsArr] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/product/products?category=${category}&range=${range}&search=${search}`, {
        headers,
      });
      // console.log(res.data);
      setProductsArr(res.data);
      // dispatch(addProducts(res.data));
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCart = async (e, product) => {
    console.log(product);
    const productId = product.id;
    const status = "incomplete";
    let quantity = 1;
    const price = product.price;
    console.log(price);

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
  };
  
  useEffect(() => {
    getProducts();

    return () => {};
  }, [search, range, category]);
  // console.log(products);
  return (
    <>
      <Grid container>
        {Array.from(productsArr).map((item) => {
          return (
            <>
              <Grid item lg={4}>
                <div
                  align="center"
                  className="product_div"
                  style={{ marginTop: 60 }}
                >
                  <div
                    style={{
                      backgroundColor: "#CBD0D6",
                      width: 282,
                      height: 360,
                    }}
                  ></div>
                  <div className="img_div">
                    <Link to={`/product/${item.id}`}>
                      <img
                        className="product_img"
                        src={item?.pictures[0]}
                        alt="swining-suit"
                        width={300}
                      />
                    </Link>
                    <div className="img__overly">
                      <div>
                        <Button
                          style={{ color: "white" }}
                          onClick={(e) => handleCart(e, item)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>{item.title}</p>
                  </div>
                  <div>
                    <p>{item?.categories?.title}</p>
                  </div>
                  <div>
                    <p
                      style={{
                        backgroundColor: "blue",
                        width: 90,
                        color: "white",
                      }}
                    >
                      {item?.price}
                    </p>
                  </div>
                </div>
              </Grid>
            </>
          );
        })}
      </Grid>
    </>
  );
}

export default Products;
