import React from 'react';
import { useNavigate } from "react-router-dom";
import { Box, AppBar, Toolbar, Button } from "@mui/material";

const AdminNavbar = () => {
    const navi = useNavigate();
    return (
      <>
        <Box sx={{ flexGrow: 1 , mb: 3}}>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" onClick={() => navi('/admin')}>Add Category</Button>
              <Button color="inherit" onClick={() => navi('/sub-category')}>Add Sub-Category</Button>
              <Button color="inherit" onClick={() => navi('/event')}>Add Event</Button>
            </Toolbar>
          </AppBar>
        </Box>
      </>
    );
  };
  
  export default AdminNavbar;
  