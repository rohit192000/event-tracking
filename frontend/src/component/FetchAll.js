
import axios from 'axios';
// here callback function is state function which set the data of state variable
const getCategory = (callback) => {
        axios.get("http://localhost:3001/category").then((response) => {
          console.log(response.data);
          callback(response.data);
        }).catch(err => {
          console.log(err)
        });
}

const getEvent = (callback) => {
    axios.get("http://localhost:3001/event").then((response) => {
      // console.log(response.data);
      callback(response.data);
    });
}

const getSubCategory = (callback) => {
  axios.get("http://localhost:3001/subcategory").then((response) => {
    // console.log(response.data);
    callback(response.data);
  });
}

export {getCategory, getEvent, getSubCategory};