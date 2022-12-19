import React, { useEffect, useState } from "react";
import { getCategory } from "../FetchAll";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";
const SelectCategory = (props) => {
  // Sub-Category Names
  const [names, setNames] = useState([]);

  // Variable for storing category names after admin selects from dropdown
  const [categoryNameSelect, setCategoryName] = useState([]);

  // handle category select
  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    names.forEach((data) => {
      if (value === data.name) {
        props.setCatId({ ...props.catId, id: data.id });
      }
    });
    setCategoryName(value);
    props.subCatIdSet.clear();
    props.subCategorySelectValue.splice(0, props.subCategorySelectValue.length);
  };

  useEffect(() => {
    getCategory(setNames);
  }, []);
  return (
    <>
      {/*Category Select */}
      <FormControl
        variant="outlined"
        style={{ width: "30%", margin: "2% 35%" }}
      >
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
export default SelectCategory;
