import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, FormControl, TextField, Button } from "@mui/material";
import { OutlinedInput, InputLabel, MenuItem, Select } from "@mui/material";
import AdminNavbar from "./AdminNavbar";
import { getCategory } from "../FetchAll";
const AddSubCategory = () => {
  const [names, setNames] = useState([]);
  useEffect(() => {
    // axios.get("http://localhost:3001/category").then((response) => {
    //   // console.log(response.data);
    //   setNames(response.data);
    // });
    getCategory(setNames);
  }, []);
  const [categoryName, setCategoryName] = useState([]);
  const [subCategory, setSubCategory] = useState({
    category_id: "",
    name: "",
  });

  const addCategoryId = (e) => {
    console.log(e);
    names.forEach((value) => {
      if (e === value.name) {
        setSubCategory((prevState) => ({
          ...prevState,
          category_id: value.id,
        }));
      }
    });
    setCategoryName(e);
  };
  console.log(subCategory);

  const addSubCategory = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/subcategory/add", subCategory)
      .then((res) => {
        alert("Sub-Category has been added succesfully");
        setCategoryName("");
        setSubCategory({ ...subCategory, name: "" });
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };
  return (
    <>
      <AdminNavbar />
      <form onSubmit={addSubCategory}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            pt: 2,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Category</InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              value={categoryName}
              onChange={(e) => addCategoryId(e.target.value)}
              input={<OutlinedInput label="Name" />}
              required
            >
              {names.map((name) => (
                <MenuItem key={name.id} value={name.name}>
                  {name.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, width: 300 }}>
            <TextField
              label="Add Sub-Category"
              variant="outlined"
              name="subcategory"
              value={subCategory.name}
              onChange={(e) =>
                setSubCategory({ ...subCategory, name: e.target.value })
              }
              required
            />
          </FormControl>

          <Button
            variant="outlined"
            color="success"
            sx={{ m: 1 }}
            type="submit"
          >
            Add SubCategory
          </Button>
        </Box>
      </form>
    </>
  );
};
export default AddSubCategory;
