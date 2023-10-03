import { React, Component } from "react";
import { Button} from "@mui/material";
import { Campaign, FileDownload } from "@mui/icons-material";
import { Campaign, CloudUpload } from "@mui/icons-material";
import CustomHeader from "./header/customheader";
import axios from "axios";
import { Link } from "react-router-dom";

import { Button, Chip, Divider, Card, CardContent } from "@mui/material";
import { Campaign, FileDownload } from "@mui/icons-material";

import { Button, TextField, Chip, Divider, Typography, CardActions } from "@mui/material";
import AppBarNav from "./AppBarNav";

export default class ViewUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : []
    };
    this.handleData = this.handleData.bind(this);
  }

  async handleData(userdata){
    this.setState({
      data:userdata
    });
  }

  async loadData(){
    axios.get("http://localhost:3000/users").then(response =>
    {
      this.handleData(response.data);
    });
  }

  async handleDelete(id){
    axios.delete(`http://localhost:3000/users/${id}`).then(response =>
    {
      this.loadData();
      alert("User Delete Successfully")
    });
  }

  async handleEdit(id){
    await sessionStorage.setItem('EditId', id);
    window.location.href='/updateUser';
  }

  async componentDidMount(){
    axios.get("http://localhost:3000/users").then(response =>
    {
      this.handleData(response.data);
    });
  }

  render() {

    return (
      <div>
        
        <AppBarNav></AppBarNav>

{/* <Divider><Chip label="Users" sx={{margin:"10px"}}></Chip></Divider> */}
<Divider><Chip label="List Of Users" sx={{fontSize:'25px', margin:"10px", marginBottom:'20px', marginTop:'20px'}}></Chip></Divider>
        

       
        {(this.state.data).map(data =>
        <Card sx={{ width:"27%", height: 200, float:"left", marginLeft:3, marginTop:4, marginRight:3 }} style={{border:'1px solid #2e7d32'}}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                     <div style={{textAlign:'center'}}>{data.name}</div>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      <div style={{textAlign:'center'}}>{data.email}</div>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      <div style={{textAlign:'center'}}>{data.username}</div>
                      </Typography>
                      <Typography gutterBottom variant="body2" component="div">
                      <div style={{textAlign:'center'}}>{data.role}</div>
                      </Typography>
                      
                    
          <br></br>
                      <Button variant="contained" style={{width:'47%', float:'left', marginRight:'7px'}} onClick={(e) => this.handleEdit(data._id)} size="small" color="warning">Edit</Button>
                      <Button variant="contained" style={{width:'47%', float:'left'}} href="/viewUsers" onClick={(e) => this.handleDelete(data._id)} size="small" color="error">Delete</Button>
                    </CardContent>
                    <CardActions>
                      
                    </CardActions>
                  </Card>
        )}
      </div>
    );
  }
}
