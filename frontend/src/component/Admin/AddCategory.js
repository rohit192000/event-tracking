import React, { useState } from "react";
import { Box, FormControl, TextField, Button } from "@mui/material";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
const AddCategory = () => {
  // Variable to send to node.
  const [category, setCategory] = useState({
    name: "",
  });
  // function for sending category variable to node
  const addCategory = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/category/add", category)
      .then((response) => {
        setCategory({ ...category, name: "" });
        alert("category has been added successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Category with same name existed");
        setCategory({ ...category, name: "" });
      });
  };
  return (
    <>
      <AdminNavbar />
      <form onSubmit={addCategory}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            pt: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormControl sx={{ width: "400px" }}>
            <TextField
              label="Add Category"
              variant="outlined"
              name="category"
              value={category.name}
              onChange={(e) =>
                setCategory({ ...category, name: e.target.value })
              }
              required
            />
          </FormControl>

          <FormControl sx={{ m: 1 }}>
            <Button
              variant="outlined"
              color="success"
              sx={{ mr: 1 }}
              type="submit"
            >
              Add Category
            </Button>
          </FormControl>
        </Box>
      </form>
    </>
  );
};
export default AddCategory;
