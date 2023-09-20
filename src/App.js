import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

import Home from "./components/View/Home";
import Cart from "./components/View/Cart";

import Badge from "@mui/material/Badge";
import { Link, Router } from "@reach/router";

const defaultTheme = createTheme();

export default function App() {
  const [cartData, setCartData] = useState([]);
  const [search, setSearch] = useState("");

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Paper
                component="form"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 300,
                  backgroundColor: "#3f93e5",
                  boxShadow: "none",
                }}
              >
                <IconButton
                  color="inherit"
                  sx={{ p: "10px", color: "white" }}
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
                <InputBase
                  color="inherit"
                  sx={{
                    ml: 1,
                    flex: 1,
                    color: "white",
                  }}
                  onChange={(event) => {
                    const delayDebounceFn = setTimeout(() => {
                      setSearch(event.target.value);
                    }, 500);
                    return () => clearTimeout(delayDebounceFn);
                  }}
                  placeholder="Search..."
                />
              </Paper>
            </Grid>
            <Grid item xs={9}>
              <IconButton sx={{ p: "10px", right: "110px" }} color="inherit">
                <FilterAltOutlinedIcon />
              </IconButton>
            </Grid>

            <Grid item xs={1} align="right">
              <Link to="cart">
                <IconButton color="inherit">
                  <Badge badgeContent={cartData.length} color="secondary">
                    <ShoppingCartTwoToneIcon style={{ color: "white" }} />
                  </Badge>
                </IconButton>
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Router>
        <Home
          path="/"
          setCartData={setCartData}
          cartData={cartData}
          search={search}
        />
        <Cart path="/cart" cartData={cartData} search={search} />
      </Router>
    </ThemeProvider>
  );
}
