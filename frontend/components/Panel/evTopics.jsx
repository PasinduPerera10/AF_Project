import React from "react";
import { Component } from "react";
import { login } from "../login";
import "../login.module.css";
import { Link } from "react-router-dom";
import { AppBar, Button, Divider, Chip } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {getTopics, updateTopicsts, banTopicsts} from '../../ApiCalls/topic.apicall';
import AppBarNav from "../AppBarNav";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default class EvTopics extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  handleLogout = (event) => {
    sessionStorage.setItem("logged", "false");

    sessionStorage.setItem("loggedName", "NotLogged!");
    sessionStorage.setItem("loggedEmail", "NotLogged!");
    sessionStorage.setItem("loggedRole", "NotLogged!");

    sessionStorage.clear;
    window.location.href = "/";
  };

  GetNav = () => {
      return (
        <div>
          <Link to="/panel">
            <button className="buttonMargin">Panel dashboard</button>
          </Link>

          <Link to="/panel/evPresentation">
            <button className="buttonMargin">Evaluate presentation</button>
          </Link>

          <button className="buttonMargin" onClick={this.handleLogout}>
            Logout
          </button>
        </div>
    );
    
  };

  handleapprove = async(event) =>{
    try{
      const id = event.target.dataset.key;
      const data = await updateTopicsts(id,({status:'approved'}));
      console.log(data);
    }catch(e){
      console.log(e)
    }
  }

  handlereject = async(event) =>{
    const id = event.target.dataset.key;
    const data = await updateTopicsts(id,({status:'rejected'}));
    console.log(data);
  }

  handleban = async(event) =>{
    
    const topic = event.target.dataset.key;
    const object={
      topic:topic
    }
    const data = await banTopicsts(object);
    console.log(data);
  }

  async componentWillMount() {
    const logged = sessionStorage.getItem("logged");
    const role = sessionStorage.getItem("loggedRole");
    if(!role.includes("staff")){
        window.location.href = "/";
    }
    if (logged == "false") {
      alert("User not logged in!");
      window.location.href = "/";
    }
    const topics = await getTopics();
    this.setState({ data: topics });
    console.log(topics);
  }

  render() {
    return (
      <div className="loginForm">
        

        <AppBarNav></AppBarNav>

        <hr></hr>

        <Divider><Chip label="Evaluate Topics" sx={{fontSize:'20px', margin:"10px", marginBottom:'20px', marginTop:'20px'}}></Chip></Divider>
        {
          <TableContainer component={Paper} sx={{ width:"75%", margin: "0 auto" }}>
            <Table sx={{ border:"none" }} aria-label="simple table">
              
              <TableHead>
              <TableRow>
              <TableCell>Topic</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {this.state.data.map((item) => {
                  return (
                    <TableRow>
                      <TableCell>{item.topic}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell align="center">
                      <Button variant="contained"  type="submit" data-key={item._id}  value='approve' onClick={this.handleapprove}>Approve</Button>&nbsp;
                      <Button variant="contained" color="error" type="submit" data-key={item._id}  value='reject' onClick={this.handlereject}>Reject</Button>&nbsp;
                      
                      </TableCell>
                      </TableRow>
                  );
                })}
                </TableBody>
              
              </Table>
            </TableContainer>
          }
      </div>
    );
  }
}
