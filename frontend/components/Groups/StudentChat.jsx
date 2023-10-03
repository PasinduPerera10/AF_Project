import React from "react";
import { Component } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import AppBarNav from "../appBarNav";
import {getGroups, getPanelMembers, assignGroup} from '../../ApiCalls/panel.apicalls';
import {CreateChat, getGroupByReg, getGroupById} from '../../ApiCalls/chat.apicall';

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
import Chat, { Message } from 'react-simple-chat';
// Chat styles
import 'react-simple-chat/src/components/index.css';


export default class Chating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      userId:'',
      messages:[{
        id: -1,
        text: 'Hello my friends :)',
        createdAt: '2021-07-21 12:09:12', // optional
        user: {
            id: 2,
            avatar: 'https://cdn-icons-png.flaticon.com/512/7024/7024084.png' // optional
        }
    }],
      Title:'Open Chat',
      groupM:-1,
      minimized:true
    };
  }

  handleGroupChange = async(event, values) => {
    await this.setState({ groupM: values });
    console.log(this.state.groupM)
  };

  handleSubmit = async(event) => {
    event.preventDefault();
    const getChat = await getGroupById(this.state.groupM);
    console.log(getChat)
    this.setState({messages:getChat});
    this.setState({ Title: 'Chat room for Group: ' + this.state.groupM})
    this.setState({minimized:false});
  }

  handleMsg = async(msg) => {
    try{
      const ChatMsg = {
        name:'chat for : ' + this.state.Title,
        text:msg.text,
        createdAt:msg.createdAt,
        groupId:this.state.groupM,
        user:msg.user
      }

      const resMsgData = CreateChat(ChatMsg);
      console.log(resMsgData)
      const getChat = await getGroupById(this.state.groupM);
      console.log(getChat)
      this.setState({messages:getChat});
    }catch(e){
      console.log(e)
    }
    
  }

  async componentWillMount(){
    try{
      const userId = sessionStorage.getItem('loggedUID');
      console.log(userId)
      this.setState({ userId:userId});

      const getChat = await getGroupById(this.state.groupM);
      console.log(getChat)
      this.setState({messages:getChat});
    }catch(e){

    }
    const RegId = sessionStorage.getItem('RegId');
    console.log(RegId)
    const items = await getGroupByReg(RegId);
    this.setState({data : items});
  }

  render() {

    return (
      <div>
        <div className="loginForm">
        <AppBarNav></AppBarNav>
        <h2>Choose group to chat</h2>

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
              <Autocomplete
                disablePortal

                onChange={this.handleGroupChange}
                id="combo-box-demo"
                options={(this.state.data).map((option) => option.groupId)}
                renderInput={(params) => <TextField {...params} label="Groups" />}
              />
              </div>
              <br></br>
              <div>
              <Button
                sx={{ width: "50%", margin: "5px" }}
                variant="contained"
                color="success"
                id="Submit"
                size="small"
                className="buttonMargin"
                type="submit"
              >
                Chat
              </Button>
              </div>
            </form>

            <Chat
                title={this.state.Title}
                minimized={this.state.minimized}
                user={{ id: this.state.userId }}
                messages={this.state.messages}
                onSend={message => this.handleMsg(message)}
            />
          </Paper>
        </div>
      </div>
    );
  }
}
