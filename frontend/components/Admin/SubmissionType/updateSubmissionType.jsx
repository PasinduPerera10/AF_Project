import React from "react";
import { Component } from "react";
import { Button, TextField, Chip, Divider, Stack, Input } from "@mui/material";
import { Campaign, CloudUpload } from "@mui/icons-material";
import { Button, TextField, Chip, Divider, Input, CircularProgress, Typography, Box, Alert } from "@mui/material";
import { Campaign, CloudUpload } from "@mui/icons-material";
import AppBarNav from "../../AppBarNav";
import axios from "axios";
export default class UpdateSubmissionType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      desc: "",
      deadline: "",
      data:[],
      edata:[],
    };
    try{
      this.id = sessionStorage.getItem('EditId');
      this.handleSubmit.config = this.handleSubmit.bind(this);
    }catch(e){
      console.log(e)
    } 
  }

handleData(subdata){
    try{
      this.setState({
        data:{
          title: <TextField id="outlined-required" label="title" defaultValue={subdata.title} fullWidth onChange={this.handleTitleChange}/>,
          desc: <TextField id="outlined-required" label="desc" defaultValue={subdata.desc} fullWidth onChange={this.handleDescChange}/>,
          deadline: <TextField id="outlined-required" type="date" label="deadline" defaultValue={subdata.deadline} fullWidth onChange={this.handleDeadlineChange}/>,
              fileDownload:
               <a target="_blank" href={"http://localhost:3000/"+subdata.file}>Download Existing File</a>,
              publishBtn:    
                  <Button
                  variant="contained"
                  color="warning"
                  id="Submit"
                  type="submit"
                  value={subdata._id}
                  fullWidth
                  style={{margin:'0px', marginTop:'20px'}}
                  >
                  Update
                  </Button>
              ,
        }
      });
  
      this.setState({
          title: subdata.title,
          desc: subdata.desc,
          deadline: subdata.deadline,
          edata: subdata,
      });
    }catch(e){
      console.log(e);
    }
    console.log(this.state.data);
  }

  async componentDidMount(){
    try{
      console.log(this.id);
      await axios.get(`http://localhost:3000/submissiontypes/get/` + this.id).then(response =>
      {
        console.log(response.data)
        this.handleData(response.data);
      });
    }catch(e){
      console.log(e)
    }
  }

  handleTitleChange = async(event) => {
    this.setState({ title: event.target.value });
  };

  handleDescChange = async(event) => {
    this.setState({ desc: event.target.value });
  };

  handleDeadlineChange = async(event) => {
    this.setState({ deadline: event.target.value });
  };

  handleSubmit = async(event) => {
    event.preventDefault();
    try{
      var completed = 0;
      const submissions = {
          title: this.state.title,
          desc: this.state.desc,
          deadline: this.state.deadline
      };
  
      await axios.put(`http://localhost:3000/submissiontypes/update/` + this.id, submissions).then(response =>
      {
        const data = response.data;
        console.log(data)
        document.getElementById("alert").style.display = "flex";
      });
    }catch(e){
      console.log(e)
    }
  };

  render() {
    return (
      <div className="">
        <AppBarNav />

        <Divider><Chip label="Update Submission Type" sx={{fontSize:'25px', margin:"10px", marginBottom:'20px', marginTop:'20px'}}></Chip></Divider>

        <div  style={{marginLeft:'400px',marginBottom:'100px', alignItems:'center', textAlign:'center', width:'40%', border:'3px solid #73AD21', padding:'10px'}}>
        <form onSubmit={this.handleSubmit} encType="multipart/form-data" method="post">
          <div>
            {this.state.data.title}
          </div>
          <br></br>
          <div>
            {this.state.data.desc}
          </div>
          <br></br>
          <div>
            {this.state.data.deadline}
          </div>
          <br></br>
            <Alert href='/manageSubmissionTypes' onClose={() => {}} variant="filled" id="alert" style={{marginTop:'10px',display:'none'}}>
            Updated Succefully!
            </Alert><br/>
          <Button className="btn btn-success" type="submit" variant="contained" style={{textAlign:"center", width:"200px", background:"green"}} onClick={this.handleSubmit}>
    <i className="far fa-check-square"></i>
&nbsp; UPDATE
</Button>
        </form>
        </div>
      </div>
    );
  }
}