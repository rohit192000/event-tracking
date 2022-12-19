import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddSubCategory from "./component/Admin/AddSubCategory";
import AddEvent from "./component/Admin/AddEvent";
import AdminNavbar from "./component/Admin/AdminNavbar";
import CategorySelect from "./component/Admin/CategorySelect";
import AddCategory from "./component/Admin/AddCategory";
import Form from "./component/User/Form";
import Filter from "./component/User/Filter";
const App = () => {
  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Form />} />
            <Route path="/filter" element={<Filter />} />


            {/*Admin Components */}
            <Route path="/admin" element={<AddCategory />} />
            <Route path="/sub-category" element={<AddSubCategory />} />
            <Route path="/categoryselect" element={<CategorySelect />} />
            <Route path="/event" element={<AddEvent />} />
            <Route path="/admin-navbar" element={<AdminNavbar />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
