import React, { useEffect, useState } from "react";
import { getCategory } from "../FetchAll";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
const CategorySelect = (props) => {
  // Sub-Category Names
  const [names, setNames] = useState([]);

  // Variable for storing category names after admin selects from dropdown
  const [categoryNameSelect, setCategoryName] = useState([]);


  // handle category select
  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    // console.log(value);
    names.forEach((data) => {
      if (value === data.name) {
        props.setEvent({ ...props.event, cat_id: data.id });
        props.setCatId({ ...props.catId, id: data.id });
      }
    });
    setCategoryName(value);
    props.subCatIdSet.clear();
    props.subCategoryNameToggle.splice(0, props.subCategoryNameToggle.length);
  };

  // Getting category names from database through node
  useEffect(() => {
    // axios.get("http://localhost:3001/category").then((response) => {
    //   // console.log(response.data);
    //   setNames(response.data);
    // });
    getCategory(setNames);
  }, []);
  return (
    <>
      {/*Category Select */}
      <FormControl variant="outlined" sx={{ width: "70%", mb: 3 }}>
        <InputLabel id="category">Category</InputLabel>
        <Select
          label="category"
          id="category"
          value={categoryNameSelect}
          onChange={handleCategoryChange}
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
    </>
  );
};
export default CategorySelect;
