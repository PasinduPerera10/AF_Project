import React from "react";
import { Component } from "react";


import "../login.module.css";
import { Link } from "react-router-dom";
import { Button, Card, CardContent, Paper, Typography } from "@mui/material";
import TextField from '@mui/material/TextField';
import {getTopicByGroupId, newTopic} from '../../ApiCalls/topic.apicall';
import {getGroupByReg} from '../../ApiCalls/group.apicall';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import AppBarNav from "../appBarNav";


export default class RegisterTopics extends Component {
  constructor() {
    super();

    this.state = {
      topic:'',
      description:'',
      status:'',

      currenttopic:"",
      currentstatus:"",
      currentsupervisor:"",
      currentcosupervisor:""
    }
  }

  handleLogout = (event) => {
    sessionStorage.setItem("logged", "false");

    sessionStorage.setItem("loggedName", "NotLogged!");
    sessionStorage.setItem("loggedEmail", "NotLogged!");
    sessionStorage.setItem("loggedRole", "NotLogged!");

    sessionStorage.clear;
    window.location.href = "/";
  };



  handleTopic = (event) => {
    this.setState({ topic: event.target.value });
  };

  handleDescription = (event) => {
    this.setState({ description: event.target.value });
  };
  handleSubmit = async (event) => {
    event.preventDefault();

    const regid = sessionStorage.getItem("RegId");
    console.log(regid)
    const groupdata = await getGroupByReg(regid);
    console.log(groupdata.length )
    if(groupdata.length !== 0){
      console.log(groupdata[0].groupId)
      const topic = {
        groupid:groupdata[0].groupId,
        topic:this.state.topic,
        description:this.state.description,
        status: this.state.status
      }
  
      const data = await newTopic(topic);
      console.log(data)
    }else{
      alert("You need to register group first!.")
      window.location.href = "/createGroup";
    }
    

  }

  async componentWillMount() {
    const logged = sessionStorage.getItem("logged");
    const role = sessionStorage.getItem("loggedRole");
    
    
    if(!role.includes("student")){
        window.location.href = "/";
    }
    if (logged == "false") {
      alert("User not logged in!");
      window.location.href = "/";
    }


    const groupid=await getGroupByReg(sessionStorage.getItem("RegId"));
    
    const topic=await getTopicByGroupId(groupid);

    console.log(topic)

    try{
      this.setState({

      currenttopic: topic.topic,
      currentstatus:topic.status,
      currentsupervisor:topic.supervisor,
      currentcosupervisor:topic.cosupervisor
      })
    }catch(e){}

  }

  render() {
    return (
      <div className="loginForm">
        <AppBarNav></AppBarNav>
        <h2>Register Topics</h2>

        <hr></hr>
        
        <Paper sx={{ padding: "32px", width: "40%", textAlign:"center", justifyContent:"center", margin: "0 auto" }}>
            <form onSubmit={this.handleSubmit}>
                <div>
                <TextField
                    required
                    label="Topic"
                    variant="outlined"
                    type="text"
                    onChange={this.handleTopic}
                />
                </div>
                <br></br>
                <div>
                <TextareaAutosize
                  label="Description"
                  aria-label="Description"
                  placeholder="Description"
                  style={{ width: 200, height: 200 }}
                  onChange={this.handleDescription}
                />
                </div>
                <br></br>
                <div>
                <Button
                    size="small"
                    variant="contained"
                    color="success"
                    className="buttonMargin"
                    type="submit"
                >
                    Submit
                </Button>
                </div>
            </form>
        </Paper>

        <Card sx={{width:"50%",margin:"0 auto", marginTop:"10px", borderTop:"3px solid #00e676"}}>
          <CardContent sx={{textAlign:"center"}}>
            <Typography variant="subtitle1">
                <b>Current Topic: </b>{this.state.currenttopic}
            </Typography>
            <Typography variant="subtitle1">
                <b>Status: </b>{this.state.currentstatus}
            </Typography>
            <Typography variant="subtitle1">
                <b>Supervisor: </b>{this.state.currentsupervisor}
            </Typography>
            <Typography variant="subtitle1">
                <b>Cosupervisor: </b>{this.state.currentcosupervisor}
            </Typography>
          </CardContent>
        </Card>

      </div>
    );
  }
}
