import {
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import images from "../images";
import { toast } from "react-toastify";
import { addPageTitle } from "../features/filter";
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

// let categoriesData;
function NewProduct() {
  let history = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const headers = {
    authorization: `Bearer ${token}`,
  };
  const userData = useSelector((state) => state.auth.user);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [categoryFlag, setCategoryFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setCategory] = useState("");
  const [pictureArr, setPictureArr] = useState([]);
  console.log(userData);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    stock_limit: "",
    price: "",
    isdraft: "",
    categoryId: "",
    pic: [],
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setProduct({ ...product, [name]: value });
  };
  let myPicArray = [];
  const handleImage = (e) => {
    e.preventDefault();
    const name = e.target.name;
    console.log(name);

    setProduct({ ...product, [name]: e.target.files });
  };

  const getCategoryData = async () => {
    try {
      const categories = await axios.get(
        "http://localhost:5000/category/category"
      );

      const data = await categories.data;
      // console.log("categories===========>", data);

      setCategoriesArr(data);

      // categoriesData.map(abc=>{
      //   console.log(abc.id);
      // })
    } catch (error) {
      console.log(error.message);
    }
  };

  // const userDate = useSelector((state) => state.auth.user);
  // console.log(userDate);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log("abcdef");

    const formData = new FormData();
    // formData.append("pic1", product.pic1);
    Array.from(product.pic).forEach((item) => {
      formData.append("pic", item);
    });
    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("stock_limit", product.stock_limit);
    formData.append("isdraft", product.isdraft);
    formData.append("categoryId", product.categoryId);
    formData.append("price", product.price);

    console.log(formData);
    try {
      const res = await axios.post(
        `http://localhost:5000/product/${userData.id}/newProduct`,
        formData,
        { headers }
      );
      console.log(res);
      if (res.data.status === "Success") {
        // setLoading(false);
        history("/shopdb");
      } else {
        setLoading(false);
        // history("/newProduct");
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
  const handleSubmitCategory = async () => {
    try {
      const message = (
        await axios.post("http://localhost:5000/category/newCategory", {
          title,
        })
      ).data;
      console.log(message);
      const notify = () =>
        toast(message.message, {
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

      setCategoryFlag(false);
      getCategoryData();
    } catch (error) {
      console.log(error.message);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    getCategoryData();

    dispatch(addPageTitle("New Product"));
    return () => {};
  }, []);
  const paperStyle = {
    padding: "30px 20px",
    width: 500,
    margin: "50px auto",
  };
  return (
    <>
      {loading ? (
        <img src={images.loading} alt="loading-img" />
      ) : (
        <Box>
          <Grid
            container
            spacing={2}
            // style={{ margin: "20px auto" }}
          >
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
                {categoryFlag ? (
                  <>
                    <TextField
                      autoComplete="off"
                      label="New Category"
                      fullWidth
                      type="text"
                      sx={{ mt: 2, mb: 2 }}
                      name="newCategory"
                      onChange={(e) => setCategory(e.target.value)}
                    />
                    <Button
                      variant="contained"
                      component="label"
                      onClick={handleSubmitCategory}
                    >
                      Save
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      component="label"
                      onClick={(e) => {
                        setCategoryFlag(true);
                      }}
                    >
                      Add Category
                    </Button>
                  </>
                )}
                <Typography sx={{ mt: 2, mb: 2 }}>
                  <Button variant="contained" component="label">
                    Upload
                    <input
                      hidden
                      multiple
                      accept="image/*"
                      type="file"
                      onChange={handleImage}
                      name="pic"
                    />
                  </Button>
                </Typography>
                <Typography sx={{ m: 2 }}>
                  {Array.from(product.pic).map((item) => {
                    return (
                      <span
                        style={{
                          border: "1px solid black",
                          display: "inline-block",
                          margin: 2,
                        }}
                      >
                        <img
                          width={"100px"}
                          height={"100px"}
                          src={item ? URL.createObjectURL(item) : null}
                          alt="img's"
                        />
                      </span>
                    );
                  })}
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Add Product
                </Button>
              </form>
            </Paper>
          </Grid>
        </Box>
      )}
    </>
  );
}

export default NewProduct;
