import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

function NewCategory() {
    const [category, setCategory] = useState("")
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setCategory({ ...category, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const message = (await axios.post("http://localhost:5000/newCategory", category))
        .data;
     console.log(message);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      <form method="post" onSubmit={handleSubmit} >
        <TextField
          autoComplete="off"
          required
          label="Category"
          //   fullWidth
          type="text"
          sx={{ mt: 2, mb: 2 }}
          name="title"
            onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          //   fullWidth
          sx={{ mt: 3, mb: 2, ml: 2 }}
          
        >
          Add
        </Button>
      </form>
    </>
  );
}

export default NewCategory;
