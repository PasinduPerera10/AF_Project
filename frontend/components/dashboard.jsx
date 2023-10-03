import React from "react";
import { Component } from "react";
import { login } from "../restcall";
import "./login.module.css";
import { Link } from "react-router-dom";
import {
  Chip,
  Button,
  Stack,
  AppBar,
  Toolbar,
  Divider,
  createTheme,
  colors,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import AppBarNav from "./AppBarNav";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default class Dashboard extends Component {
  constructor() {
    const theme = createTheme({
      palette: {
        secondary: {
          main: colors.orange[500],
        },
      },
    });

    super();
    this.isAdmin = false;
  }

  handleLogout = (event) => {
    sessionStorage.setItem("logged", "false");

    sessionStorage.setItem("loggedName", "NotLogged!");
    sessionStorage.setItem("loggedEmail", "NotLogged!");
    sessionStorage.setItem("loggedRole", "NotLogged!");

    sessionStorage.clear;
    window.location.href = "/";
  };

  // GetNav = () => {
  //   const role = sessionStorage.getItem("loggedRole");

  //   if (role == "trader") {
  //     return (
  //       <div>
  //         <Link to="/addItems">
  //           <Button
  //             size="small"
  //             variant="contained"
  //             color="success" className="buttonMargin">Add Items</Button>
  //         </Link>

  //         <Link to="/editItems">
  //           <Button
  //             size="small"
  //             variant="contained"
  //             color="success"  className="buttonMargin">Edit Items</Button>
  //         </Link>

  //         <Button
  //             size="small"
  //             variant="contained"
  //             color="success" className="buttonMargin" onClick={this.handleLogout}>
  //           Logout
  //         </Button>
  //       </div>
  //     );
  //   } else if (role == "customer") {
  //     return (
  //       <div>
  //         <Link to="/viewItems">
  //           <Button
  //             size="small"
  //             variant="contained"
  //             color="success" className="buttonMargin">View Items</Button>
  //         </Link>

  //         <Link to="/viewCart">
  //           <Button
  //             size="small"
  //             variant="contained"
  //             color="success" className="buttonMargin">View Cart</Button>
  //         </Link>

  //         <Button
  //             size="small"
  //             variant="contained"
  //             color="success" className="buttonMargin" onClick={this.handleLogout}>
  //           Logout
  //         </Button>
  //       </div>
  //     );
  //   }
  // };

  componentWillMount() {
    const logged = sessionStorage.getItem("logged");
    const role = sessionStorage.getItem("loggedRole");
    if (sessionStorage.getItem("loggedRole") == "admin") {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }

    switch (role) {
      case "panel":
        window.location.href = "/panel";
        break;
    }

    if (logged == "false") {
      alert("User not logged in!");
      window.location.href = "/";
    }
  }

  render() {
    return (
      <div className="loginForm">

        <AppBarNav></AppBarNav>

      <Divider><Chip sx={{margin:"10px"}} label="Dashboard"></Chip></Divider>
        

        
        <Typography variant="h2" sx={{fontSize:'50px'}}>Hi {sessionStorage.getItem("loggedName")}</Typography>
        <TableContainer sx={{ width: "50%",margin: "0 auto" }}  component={Paper}>
        <Table sx={{ border:"none" }}>
        <TableBody>
        <TableRow>
        <TableCell align="center">Name</TableCell>
              <TableCell align="center">{sessionStorage.getItem("loggedName")}</TableCell>
              </TableRow>
            <TableRow>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">{sessionStorage.getItem("loggedEmail")}</TableCell>
              </TableRow>
            <TableRow>
            <TableCell align="center">Role</TableCell>
            <TableCell align="center">{sessionStorage.getItem("loggedRole")}</TableCell>
              </TableRow>
            </TableBody>
        </Table>

        </TableContainer>
      </div>
    );
  }
}
