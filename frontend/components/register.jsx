import React from "react";
import { Component } from "react";
import "./login.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";
import { register } from "../restcall";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { Button, Paper } from "@mui/material";
import CryptoJS from"crypto-js";
var key = "ASECRET";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      username: "",
      password: "",
      password2: "",
      role: "customer",
      isstudent:false,
      registationnum:"",
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };
  handleregistationnumChange = (event) => {
    this.setState({ registationnum: event.target.value });
  };

  handleUserNameChange = (event) => {
    this.setState({ username: event.target.value });
  };

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handlePassword2Change = (event) => {
    this.setState({ password2: event.target.value });
  };

  handleRoleChange = async(event) => {
    await this.setState({ role: event.target.value });
    if((this.state.role).includes("student")){
      await this.setState({ isstudent: true });
    }else{
      await this.setState({ isstudent: false });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('user')
    const user = {
      email: this.state.email,
      name: this.state.name,
      username: this.state.username,
      password: (CryptoJS.AES.encrypt((this.state.password), key)).toString(),
      password2: this.state.password2,
      role: this.state.role,
      reg: this.state.registationnum,
    };


    if (this.state.password != this.state.password2) {
      alert("Passwords do not match!");
      return;
    }

    const displayMessage = `<div>Your registration was successful, ${user.name}!</div>`;
    document.getElementById('displayMessage').innerHTML = displayMessage;

    register(user);
  };

  render() {
    return (
      <div className="registerForm" style={{ textAlign: "center" }}>

<img style={{width: "20%"}} src={require('../resources/SLIIT.png')} /> 

        

        <Paper
          sx={{
            padding: "32px",
            width: "40%",
            textAlign: "center",
            justifyContent: "center",
            margin: "0 auto",
            borderBottom: '3px solid #00e676'
          }}
        >
          <form onSubmit={this.handleSubmit}>
          <h2 style={{marginTop:'0px'
                        ,color: '#fff',
                        background: '#00e676',
                        borderRadius: '100px',
                        display: 'inline-block',
                        padding: '6px 40px',
                        fontFamily: 'sans-serif',
          }}>Register</h2>
            <div>
              <TextField
                label="Name"
                variant="outlined"
                required
                type="text"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </div>
            <br></br>
            <div>
              <TextField
                label="Username"
                variant="outlined"
                required
                type="text"
                value={this.state.username}
                onChange={this.handleUserNameChange}
              />
            </div>
            <br></br>
            <div>
              <TextField
                label="Email"
                variant="outlined"
                required
                type="email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </div>
            <br></br>
            <div>
              <TextField
                label="Password"
                variant="outlined"
                required
                type="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </div>
            <br></br>
            <div>
              <TextField
                label="Re-enter Password"
                variant="outlined"
                required
                type="password"
                value={this.state.password2}
                onChange={this.handlePassword2Change}
              />
            </div>
            <br></br>
            <div>
              <InputLabel id="role">Role</InputLabel>
              <Select
                labelId="role"
                value={this.state.role}
                onChange={this.handleRoleChange}
                label="Role"
              >
                <MenuItem value={"admin"}>admin</MenuItem>
                <MenuItem value={"student"}>student</MenuItem>
                <MenuItem value={"staff"}>staff</MenuItem>
              </Select>
            </div>
            <br></br>
            <div>
              {this.state.isstudent && (
                <Box>
                  <TextField
                    label="Registation Number"
                    variant="outlined"
                    required
                    type="text"
                    value={this.state.registationnum}
                    onChange={this.handleregistationnumChange}
                  />
                </Box>
              )}
            </div>
            <br></br>
            <Button
              variant="contained"
              color="success"
              id="Submit"
              size="small"
              className="buttonMargin"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Paper>

        <Link style={{ textDecoration: "none" }} to="/">
          <Button
          sx={{width:"45%", margin: "10px"}}
            size="small"
            variant="contained"
            color="primary"
            className="buttonMargin"
          >
            Login
          </Button>
        </Link>
      </div>
    );
  }
}