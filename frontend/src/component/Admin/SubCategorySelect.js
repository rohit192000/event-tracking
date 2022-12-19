import React, { useState, useEffect } from "react";
import axios from "axios";
import { InputLabel, Select, MenuItem, OutlinedInput } from "@mui/material";
const SubCategorySelect = (props) => {

  // store data to show on select option on sub-categories
  const [subCategoryNameSelect, setSubCategoryName] = useState([]);

  // store data in subCategoryNameToggle on change to show multiple data
  const handleSubCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    props.setSubCategoryNameToggle(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    // console.log(subCategoryNameSelect);
  };

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
      <InputLabel id="sub_category">Sub-Category</InputLabel>

      <Select
        label="sub_category"
        id="sub_category"
        multiple
        value={props.subCategoryNameToggle}
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
    </>
  );
};
export default SubCategorySelect;
