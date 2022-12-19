import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  FormControl,
} from "@mui/material";
const SelectSubCategory = (props) => {
  // store data to show on select option on sub-categories
  const [subCategoryNameSelect, setSubCategoryName] = useState([]);

  // store data in subCategorySelectValue on change to show multiple data
  const handleSubCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    props.setSubCategorySelectValue(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    // console.log(subCategoryNameSelect);
  };

  // get the selected sub-category id's and add into the set of sub-categories id's.
  const getSubCatId = (e) => {
    console.log("Sub Category Id : ", e);
    if (props.subCatIdSet.size === 0) {
      props.setSubCatIdSet((prevState) => new Set(prevState).add(e));
      // console.log(typeof subCatIdSet);
    } else if (props.subCatIdSet.has(e)) {
      props.subCatIdSet.delete(e);
      console.log(
        "Deleted values in set of id's of sub categories : ",
        props.subCatIdSet
      );
    } else {
      props.setSubCatIdSet((prevState) => new Set(prevState).add(e));
      // console.log(event)
    }
  };

  useEffect(() => {
    if (props.catId.id) {
      axios
        .post("http://localhost:3001/subcategory/specific", props.catId)
        .then((response) => {
          // console.log(response.data);
          setSubCategoryName(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.catId]);
  return (
    <>
      {/*Sub-Category multi select toggle*/}
      <FormControl
        variant="outlined"
        style={{ width: "30%", margin: "2% 35%" }}
      >
        <InputLabel id="sub_category">Sub-Category</InputLabel>

        <Select
          label="sub_category"
          id="sub_category"
          multiple
          value={props.subCategorySelectValue}
          onChange={handleSubCategoryChange}
          input={<OutlinedInput label="Name" />}
          required
        >
          {subCategoryNameSelect.map((row, index) => (
            <MenuItem
              key={row.id}
              value={row.name}
              onClick={(e) => getSubCatId(row.id)}
            >
              {row.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
export default SelectSubCategory;
