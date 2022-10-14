import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import images from "../images";
import "../navbarStyle.css";
import { addSearch,addRange,addCategory,addPageTitle } from "../features/filter";

function Navbar() {
  const items = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const pageTitle = useSelector((state) => state.filter.pageTitle);
  let location = useLocation();
  let dispatch = useDispatch();
  // console.log(user);
  // console.log(location.pathname);
  return (
    <>
      {user.isShop ? (
        <>
          <nav className="nav">
            <NavLink to={"/shopdb"} className="site-title">
              <img src={images.logo} alt="logo" 
              onClick=
              {(e) => {
                dispatch(addPageTitle("Home Page"));
              }}
              />
              
            </NavLink>
            <ul>
              <li>
                <NavLink to="/orders">Orders</NavLink>
              </li>
              <li>
                <NavLink to={"/profile"}>Profile</NavLink>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <>
          <nav className="nav">
            <NavLink to={"/userdb"} className="site-title">
              <img
                src={images.logo}
                alt="logo"
                onClick={(e) => {
                  dispatch(addPageTitle("Home Page"));
                  dispatch(addCategory(''));
                  dispatch(addSearch(''));
                  dispatch(addRange(0));
                }}
              />
            </NavLink>
            <ul>
              <li>
                <NavLink to={"/cart"}>
                  <img src={images.cart} alt="logo" />
                  Cart
                </NavLink>
                <sup>{items}</sup>
              </li>
              <li>
                <NavLink to={"/history"}>history</NavLink>
              </li>
              <li>
                <NavLink to={"/profile"}>Profile</NavLink>
              </li>
            </ul>
          </nav>
        </>
      )}
      {
        <div
          style={{
            backgroundColor: "blue",
            padding: 50,
            color: "white",
            fontSize: 30,
            textTransform: "uppercase",
          }}
        >
          {pageTitle}
        </div>
      }
      {/* <AppBar
        position="static"
        style={{ backgroundColor: "#FFFFFF", height: "121px", width: "100%" }}
      >
        <Toolbar sx={{ mt: "30px" }}>

          {user.isShop ? (
            <>
            
              <Typography variant="img" component="div" sx={{ flexGrow: 1 }}>
              <NavLink to={'/shopdb'}>
                <img 
                src={images.logo} alt="logo" /></NavLink>
              </Typography>
              <Button
                component={NavLink}
                to="/orders"
                sx={{
                  color: "black",
                  textTransform: "uppercase",
                  mr: "80px",
                }}
              >
                Orders
              </Button>
            </>
          ) : (
            <>
            <NavLink to={'/userdb'}>
              <Typography variant="img" component="div" sx={{ flexGrow: 1 }}>
                <img src={images.logo} alt="logo" />
              </Typography></NavLink>
              <Button
                component={NavLink}
                to="/cart"
                sx={{
                  color: "black",
                  textTransform: "uppercase",
                  mr: "80px",
                }}
              >
                <img src={images.cart} alt="logo" />
                Cart {items}
              </Button>
              <Button
                component={NavLink}
                to="/history"
                sx={{
                  color: "black",
                  textTransform: "uppercase",
                  mr: "80px",
                }}
              >
                history
              </Button>
            </>
          )}

          <Button
            component={NavLink}
            to="/profile"
            sx={{ color: "black", textTransform: "uppercase", mr: "80px" }}
          >
            Profile
          </Button>
        </Toolbar>
      </AppBar> */}
    </>
  );
}

export default Navbar;
