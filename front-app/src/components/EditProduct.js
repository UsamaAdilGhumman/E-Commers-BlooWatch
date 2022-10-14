import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";


const type = [
    {
      value: "1",
      label: "Draft",
    },
    {
      value: "0",
      label: "Live",
    },
  ];



function EditProduct() {
   const {id} =  useParams();

  const [categoriesArr, setCategoriesArr] = useState([]);
//   console.log(categoriesArr);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    stock_limit: "",
    price: "",
    isdraft: "",
    categoryId: "",
    pic1: "",
    pic2: "",
    pic3: "",
    pic4: "",
    pic5: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setProduct({ ...product, [name]: value });
  };
  const handleImage = (e) => {
    const name = e.target.name;
    console.log(name);
    // console.log("hello world!");
    // console.log(e.target.files[0]);
    console.log(e.target.files[0]);
    setProduct({ ...product, [name]: e.target.files[0] });
    //console.log(image);
  };
  const getCategoryData = async () => {
    try {
      const categories = await axios.get("http://localhost:5000/category");

      const data = await categories.data;
      //console.log(data);

      setCategoriesArr(data);

      // categoriesData.map(abc=>{
      //   console.log(abc.id);
      // })
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("abcdef");

    const formData = new FormData();
    formData.append("pic1", product.pic1);
    formData.append("pic2", product.pic2);
    formData.append("pic3", product.pic3);
    formData.append("pic4", product.pic4);
    formData.append("pic5", product.pic5);
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("stock_limit", product.stock_limit);
    formData.append("isdraft", product.isdraft);
    formData.append("categoryId", product.categoryId);
    formData.append('price',product.price);

    console.log(formData);
    try {
      const res = await axios.post(`http://localhost:5000/editproduct/${id}`, formData,
    //   {headers}
      );
      console.log(res);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getProductData = async()=>{
    try {
        const res = await (await axios.get(`http://localhost:5000/product/${id}`)).data;
        //console.log(res);
        setProduct(res);
    } catch (error) {
        console.log(error.message);
    }
  }
//   console.log(product);
  useEffect(() => {
    getProductData();
    getCategoryData();

    return () => {};
  }, []);
  const paperStyle = {
    padding: "30px 20px",
    width: 500,
    margin: "50px auto",
  };
  return (
    <>
      <Grid container spacing={2} style={{ margin: "20px auto" }}>
        <Paper elevation={20} style={paperStyle}>
          <Grid align="center">
            <Typography variant="p">
              Please fill this form to create new Product
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <TextField
              autoComplete="off"
              required
              label="Title"
              fullWidth
              type="text"
              sx={{ mt: 2, mb: 2 }}
              name="title"
              onChange={handleChange}
              value={product.title}
            />
            <TextField
              autoComplete="off"
              required
              label="Description"
              fullWidth
              type="text"
              sx={{ mt: 2, mb: 2 }}
              name="description"
              onChange={handleChange}
              value={product.description}
            />
            <TextField
              autoComplete="off"
              required
              label="Stock Limit"
              fullWidth
              type="number"
              sx={{ mt: 2, mb: 2 }}
              name="stock_limit"
              onChange={handleChange}
              value={product.stock_limit}
            />
            <TextField
              autoComplete="off"
              required
              label="Price"
              fullWidth
              type="number"
              sx={{ mt: 2, mb: 2 }}
              name="price"
              onChange={handleChange}
              value={product.price}
            />
            <TextField
              select
              label="Select"
              value={product.isdraft}
              onChange={handleChange}
              helperText="Please select Product type"
              fullWidth
              sx={{ mt: 2, mb: 2 }}
              name="isdraft"
            >
              {type.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Select"
              value={product.categoryId}
              onChange={handleChange}
              helperText="Please select Category"
              fullWidth
              sx={{ mt: 2, mb: 2 }}
              name="categoryId"
            >
              {categoriesArr.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.title}
                </MenuItem>
              ))}
            </TextField>
            <Typography sx={{ mt: 2, mb: 2 }}>
              <input
                required
                accept="image/*"
                type="file"
                onChange={handleImage}
                name="pic1"
              />
            </Typography>
            <Typography sx={{ mt: 2, mb: 2 }}>
              <input
                required
                accept="image/*"
                type="file"
                onChange={handleImage}
                name="pic2"
              />
            </Typography>
            <Typography sx={{ mt: 2, mb: 2 }}>
              <input
                required
                accept="image/*"
                type="file"
                onChange={handleImage}
                name="pic3"
              />
            </Typography>
            <Typography sx={{ mt: 2, mb: 2 }}>
              <input
                required
                accept="image/*"
                type="file"
                onChange={handleImage}
                name="pic4"
              />
            </Typography>
            <Typography sx={{ mt: 2, mb: 2 }}>
              <input
                required
                accept="image/*"
                type="file"
                onChange={handleImage}
                name="pic5"
              />
            </Typography>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Product
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
}

export default EditProduct;
