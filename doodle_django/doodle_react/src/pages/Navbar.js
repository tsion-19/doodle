import React from "react";
import {
  Toolbar,
  Avatar,
  Menu,
  Box,
  IconButton,
  Tooltip,
  MenuItem,
  Typography,
} from "@mui/material";
import "./navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const settings = [
    { id: "1", title: "home", link: "/" },
    { id: "2", title: "Dashboard", link: "/dashboard" },
    { id: "3", title: "Register", link: "/register" },
    { id: "4", title: "login", link: "/login" },
  ];

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <div className="navbar">
      <h1 style={{ color: "#00000 " }}>
        <img className="img" src="/unical.png" alt="imag" />
        Doodle Unical
      </h1>
      <div className="profile">
        <Toolbar>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
                  <Link to={setting.link}>
                    <Typography textAlign="center">{setting.title}</Typography>
                  </Link>
                </MenuItem>
              ))}
              {/* <Link to="/login">
                <Button>Login</Button>
              </Link> */}
            </Menu>
          </Box>
        </Toolbar>
      </div>
    </div>
  );
}

export default Navbar;
