import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Stack, AppBar, Toolbar, Divider, createTheme, colors } from "@mui/material";

class CustomHeader extends Component {
  constructor()
  {
    const theme = createTheme({
      palette: {
        secondary: {
          main: colors.orange[500]
        }
      }
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

  componentWillMount() {
    const logged = sessionStorage.getItem("logged");
    const role = sessionStorage.getItem("loggedRole");

    if(sessionStorage.getItem("loggedRole") == 'admin'){
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
    }
  }

  render() {
    return (
        <AppBar position="static" color="success">
          <Toolbar variant="dense">
            <Link to="/dashboard">
              <Button sx={{ color: "white" }} size="small" color="inherit">
                Dashboard
              </Button>
            </Link>

            <Divider orientation="vertical" variant="middle" flexItem />
            <Link style={{ textDecoration: "none" }} to="/createSubmissionType">
              <Button sx={{ color: "white" }} size="small" color="inherit">
                Create SubmissionTypes
              </Button>
            </Link>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Link style={{ textDecoration: "none" }} to="/createStudentSubmission">
              <Button sx={{ color: "white" }} size="small" color="inherit">
                Create Student Submissions
              </Button>
            </Link>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Link style={{ textDecoration: "none" }} to="/viewSubmissionTypes">
              <Button sx={{ color: "white" }} size="small" color="inherit">
                View SubmissionTypes
              </Button>
            </Link>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Link style={{ textDecoration: "none" }} to="/manageSubmissionTypes">
              <Button sx={{ color: "white" }} size="small" color="inherit">
                Manage SubmissionTypes
              </Button>
            </Link>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Link style={{ textDecoration: "none" }} to="/viewStudentSubmissions">
              <Button sx={{ color: "white" }} size="small" color="inherit">
                View Student Submissions
              </Button>
            </Link>
            <Divider orientation="vertical" variant="middle" flexItem />

            <Link style={{ textDecoration: "none" }} to="/createGroup">
              <Button sx={{ color: "white" }} size="small" color="inherit">
                Create Group
              </Button>
            </Link>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Link style={{ textDecoration: "none" }} to="/viewUsers">
              <Button sx={{ color: "white" }} size="small" color="inherit">
                View Users
              </Button>
            </Link>
            <Divider orientation="vertical" variant="middle" flexItem />

            { this.isAdmin ? 
            
            <Link style={{ textDecoration: "none" }} to="/managePublications">
              <Button sx={{ color: "white" }} size="small" color="inherit">
                Publication
              </Button>
            </Link>

            : 

            <Link style={{ textDecoration: "none" }} to="/viewPublication">
              <Button sx={{ color: "white" }} size="small" color="inherit">
                Publication(s)
              </Button>
            </Link>
            
            }
            <Divider orientation="vertical" variant="middle" flexItem />

            <Link to="/">
              <Button
                sx={{ color: "yellow" }}
                size="small"
                color="inherit"
                onClick={this.handleLogout}
              >
                Logout
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
    );
  }
}

export default CustomHeader;