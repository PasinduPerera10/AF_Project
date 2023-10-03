import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Stack,
  AppBar,
  Toolbar,
  Divider,
  createTheme,
  colors,
} from "@mui/material";

class AppBarNav extends Component {
  constructor() {
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

    if (sessionStorage.getItem("loggedRole") == "admin") {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  render() {
    return (
      <AppBar position="static" color="success">
        <Toolbar variant="dense">
          <Link style={{ textDecoration: "none" }} to="/dashboard">
            <Button sx={{ color: "white" }} size="small" color="inherit">
              Dashboard
            </Button>
          </Link>
          <Divider orientation="vertical" variant="middle" flexItem />

          {
            // start Student tabs
          }
          {sessionStorage.getItem("loggedRole") == "student" ? (
            <>
              <Link style={{ textDecoration: "none" }} to="/createGroup">
                <Button sx={{ color: "white" }} size="small" color="inherit">
                  +Groups
                </Button>
              </Link>
              <Divider orientation="vertical" variant="middle" flexItem />

              <Link
                style={{ textDecoration: "none" }}
                to="/viewSubmissionTypes"
              >
                <Button sx={{ color: "white" }} size="small" color="inherit">
                  +SUBMISSIONS
                </Button>
              </Link>
              <Divider orientation="vertical" variant="middle" flexItem />

              <Link
                style={{ textDecoration: "none" }}
                to="/viewMySubmissions"
              >
                <Button sx={{ color: "white" }} size="small" color="inherit">
                  +My Submissions
                </Button>
              </Link>
              <Divider orientation="vertical" variant="middle" flexItem />

              <Link style={{ textDecoration: "none" }} to="/registerTopics">
                <Button sx={{ color: "white" }} size="small" color="inherit">
                  +Topics
                </Button>
              </Link>
              <Divider orientation="vertical" variant="middle" flexItem />

              <Link style={{ textDecoration: "none" }} to="/viewPublications">
                <Button sx={{ color: "white" }} size="small" color="inherit">
                  Publications
                </Button>
              </Link>
              <Divider orientation="vertical" variant="middle" flexItem />

              <Link style={{ textDecoration: "none" }} to="/chats">
              <Button sx={{ color: "white" }} size="small" color="inherit">
                Chat
              </Button>
            </Link>

            <Divider orientation="vertical" variant="middle" flexItem />
            </>
          ) : (
            <></>
          )}
          {
            //End Student tabs
          }

          

{//Start admin tabs
}
          {this.isAdmin ? 
            <>
              <Link style={{ textDecoration: "none" }} to="/managePublications">
                <Button sx={{ color: "white" }} size="small" color="inherit">
                  +Publications
                </Button>
              </Link>
              <Divider orientation="vertical" variant="middle" flexItem />

              <Link
                style={{ textDecoration: "none" }}
                to="/createSubmissionType"
              >
                <Button sx={{ color: "white" }} size="small" color="inherit">
                  +ASSIGNMENTS
                </Button>
              </Link>
              <Divider orientation="vertical" variant="middle" flexItem />

              <Link style={{ textDecoration: "none" }} to="/viewUsers">
                <Button sx={{ color: "white" }} size="small" color="inherit">
                  Users
                </Button>
              </Link>
              <Divider orientation="vertical" variant="middle" flexItem />

              <Link style={{ textDecoration: "none" }} to="/addMarkingSchema">
            <Button sx={{ color: "white" }} size="small" color="inherit">
              +Marking Scheme
            </Button>
          </Link>

          <Divider orientation="vertical" variant="middle" flexItem />

          <Link style={{ textDecoration: "none" }} to="/viewStudentSubmissions">
            <Button sx={{ color: "white" }} size="small" color="inherit">
              View Submissions
            </Button>
          </Link>
      

          <Divider orientation="vertical" variant="middle" flexItem />
          <Link style={{ textDecoration: "none" }} to="/panelManagement">
            <Button sx={{ color: "white" }} size="small" color="inherit">
              Panels
            </Button>
          </Link>
          <Divider orientation="vertical" variant="middle" flexItem />
            </>
           : 
            <></>
          }

          {//End admin tabs
}

{//start staff tabs
}
{sessionStorage.getItem("loggedRole") == "staff" ? 

<>

          <Link style={{ textDecoration: "none" }} to="/supervisor">
            <Button sx={{ color: "white" }} size="small" color="inherit">
              Supervisor
            </Button>
          </Link>

          <Divider orientation="vertical" variant="middle" flexItem />

          <Link style={{ textDecoration: "none" }} to="/viewStudentSubmissions">
            <Button sx={{ color: "white" }} size="small" color="inherit">
              View Submissions
            </Button>
          </Link>
          <Divider orientation="vertical" variant="middle" flexItem />

          <Link style={{ textDecoration: "none" }} to="/panel/evTopics">
            <Button sx={{ color: "white" }} size="small" color="inherit">
              Evaluate Topics
            </Button>
          </Link>
          <Divider orientation="vertical" variant="middle" flexItem />



          
          <Link style={{ textDecoration: "none" }} to="/markSubmissions">
            <Button sx={{ color: "white" }} size="small" color="inherit">
              +Marks
            </Button>
          </Link>

          <Divider orientation="vertical" variant="middle" flexItem />

          <Link style={{ textDecoration: "none" }} to="/chat">
            <Button sx={{ color: "white" }} size="small" color="inherit">
              Chat
            </Button>
          </Link>

          <Divider orientation="vertical" variant="middle" flexItem />
</>

:

<>

</>



}
{//end staff tabs
}
          

          

          

          <Link style={{ textDecoration: "none" }} to="/">
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

export default AppBarNav;
