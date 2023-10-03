import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";


import { Button } from "@mui/material";
import { getGroupId, createGroup } from "../../ApiCalls/group.apicall";
import { addItem } from "../../restcall";
import { getGroupByReg } from "../../ApiCalls/group.apicall";

import AppBarNav from "../AppBarNav";
import {
  Button,
  Stack,
  AppBar,
  Toolbar,
  Divider,
  createTheme,
  colors,
  Paper,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Chip
} from "@mui/material";

export default class CreateGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      member1: sessionStorage.getItem("RegId"),
      member2: "",
      member3: "",
      member4: "",
      groupId: "",
      currentGroup:""
    };

    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleMember1=this.handleMember1.bind(this);
    this.handleMember2=this.handleMember2.bind(this);
    this.handleMember3=this.handleMember3.bind(this);
    this.handleMember4=this.handleMember4.bind(this);
  }


  handleMember1 = (event) => {
    this.setState({ member1: event.target.value });
  };
  handleMember2 = (event) => {
    this.setState({ member2: event.target.value });
  };
  handleMember3 = (event) => {
    this.setState({ member3: event.target.value });
  };
  handleMember4 = (event) => {
    this.setState({ member4: event.target.value });
  };

  async handleSubmit(event){
    event.preventDefault();

    var groupId=5000000000;

    const regId=sessionStorage.getItem("RegId")
    const result=await getGroupByReg(regId)

    try{
      console.log(result)
      if(result){
        alert("You already have a Group: Group "+result[0].groupId);
        window.location.href="/registerTopics"
        return;
      }
    }catch(e){}
    
  
    try{
      groupId= await getGroupId();
      await console.log('ry ' + groupId);
    }catch(e){
      console.log(e);
    }
    
  const member1=this.state.member1;
  const member2=this.state.member2;
  const member3=this.state.member3;
  const member4=this.state.member4;


    const group={
      member1: member1,
      member2: member2,
      member3: member3,
      member4: member4,
      groupId: groupId
    }
    createGroup(group);

   console.log(group);
   alert("Group created!");
   window.location.href = "/registerTopics";

  }

  handleLogout = (event) => {
    sessionStorage.setItem("logged", "false");

    sessionStorage.setItem("loggedName", "NotLogged!");
    sessionStorage.setItem("loggedEmail", "NotLogged!");
    sessionStorage.setItem("loggedRole", "NotLogged!");

    sessionStorage.clear;
    window.location.href = "/";
  };

  async componentWillMount(){
    try{const group=await getGroupByReg(sessionStorage.getItem("RegId"))
      
    const groupid=group[0].groupId
    this.setState({currentGroup:groupid})}catch(e){}
    
  }

    
      
  

  render() {
    return (
      <div>
        <div className="loginForm">
          <AppBarNav></AppBarNav>

          <h2>Create Group</h2>

          <hr></hr>
          <Paper
            sx={{
              padding: "32px",
              width: "40%",
              textAlign: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <form onSubmit={this.handleSubmit}>
              <div>
                <TextField
                disabled
                  label="Member 1"
                  variant="outlined"
                  required
                  type="text"
                  value={this.state.member1}
                  onChange={this.handleMember1}
                />
              </div>
              <br></br>
              <div>
                <TextField
                  label="Member 2"
                  variant="outlined"
                  required
                  type="text"
                  value={this.state.member2}
                  onChange={this.handleMember2}
                />
              </div>
              <br></br>
              <div>
                <TextField
                  label="Member 3"
                  variant="outlined"
                  required
                  type="text"
                  value={this.state.member3}
                  onChange={this.handleMember3}
                />
              </div>
              <br></br>
              <div>
                <TextField
                  label="Member 4"
                  variant="outlined"
                  required
                  type="text"
                  value={this.state.member4}
                  onChange={this.handleMember4}
                />
              </div>

              <br></br>
              
              <Button
                sx={{ width: "50%", margin: "5px" }}
                variant="contained"
                color="success"
                id="Submit"
                size="small"
                className="buttonMargin"
                type="submit"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </form>
          </Paper>

          <Divider>
          <Chip label={"Group: "+this.state.currentGroup} sx={{margin:"10px", fontSize:"20px"}}>  </Chip>
          </Divider>

        </div>
      </div>
    );
  }
}
