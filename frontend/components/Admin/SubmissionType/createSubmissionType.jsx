import { React,Component } from "react";
import { Button, Chip, Input } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { Button, TextField, Chip, Divider, Input, CircularProgress, Typography, Box } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import CustomHeader from "../../header/customheader";
import axios from "axios";
import AppBarNav from "../../AppBarNav";
import TextareaAutosize from '@mui/material/TextareaAutosize';
export default class CreateSubmissionType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      desc: "",
      deadline: "",
    };
    this.handleSubmit.config = this.handleSubmit.bind(this);
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
    var completed = 0;
    const submissiontype = {
      title: this.state.title,
      desc: this.state.desc,
      deadline: this.state.deadline,
    };

    axios.post("http://localhost:3000/submissiontypes/new", submissiontype).then(response =>
    {
      const data = response.data;
      if(response.data){
        alert("New Submission Type Successfully Created")
      }
    });
  };

  render() {
    return (
      <div>
        <AppBarNav></AppBarNav>

        <div style={{textAlign:'right', marginTop:'20px'}}>
        <a href='/manageSubmissionTypes' style={{textDecoration:'none'}}><Button variant="contained" margin="normal" id="Submit" type="submit">Manage Submission Types</Button></a>
        </div>

        <Divider><Chip label="New Submission Type" sx={{fontSize:'25px', margin:"10px", marginBottom:'20px', marginTop:'20px'}}></Chip></Divider>

        <div  style={{marginTop:'50px',marginLeft:'400px',marginBottom:'100px', alignItems:'center', textAlign:'center', width:'40%', border:'3px solid #73AD21', padding:'10px'}}>
        <form onSubmit={this.handleSubmit} encType="multipart/form-data" method="post">
          <div>
            <TextField variant="outlined" margin="normal"  id="title" label="Title" onChange={this.handleTitleChange} required/>
          </div>
          <br></br>
          <div>
            <TextareaAutosize variant="outlined" margin="normal" id="desc" label="Description" placeholder="Description" style={{ width: 200, height: 70 }} onChange={this.handleDescChange} required/>
          </div>
          <br></br>
          <div>
            <TextField variant="outlined" margin="normal" id="deadline" type="date" onChange={this.handleDeadlineChange} required/>
          </div>
          <br></br>  
          <Button  variant="contained" color="success" margin="normal" id="Submit" type="submit">
            SUBMIT
          </Button>
        </form>
        </div>
      </div>
    );
  }
}


