import React from "react";
import { Component } from "react";

import { Button, TextField, Chip, Divider, Stack, Input } from "@mui/material";
import { Campaign, CloudUpload } from "@mui/icons-material";

import { Button, TextField, Chip, Divider, Input, CircularProgress, Typography, Box, Alert } from "@mui/material";
import { Campaign, CloudUpload } from "@mui/icons-material";

import AppBarNav from "../AppBarNav";
import axios from "axios";

export default class AddPublications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      desc: "",
      file: "",
      progressPrecentage: 0,
    };
    this.handleSubmit.config = this.handleSubmit.bind(this);
  }

  handleTitleChange = (event) => {
    this.setState({ title: event.target.value });
  };

  handleDescChange = (event) => {
    this.setState({ desc: event.target.value });
  };

  handleFileChange = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  handleFileRemove = (event) =>{
    this.setState({ file:'' });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    
    var completed = 0;

    const publication = {
      desc: this.state.desc,
      title: this.state.title,
      file: this.state.file
    };

    document.getElementById("progress").style.display = "inline-flex";

    const config = {
      headers: {'content-type' : 'multipart/form-data'},
      onUploadProgress: function(progressEvent){
          completed = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          this.setState({ progressPrecentage: completed });
        }
    }

    config.onUploadProgress = config.onUploadProgress.bind(this);

    axios.post("http://localhost:3000/publication/add", publication, config).then(response =>
    {
      const data = response.data;
      //alert("Published!");
      document.getElementById("progress").style.display = "none";
      document.getElementById("alert").style.display = "flex";
    });

  };

  render() {

    return (
      <div className="registerForm">
        
        <AppBarNav />

        <div  style={{marginTop:'40px'}}>

            <Divider>
                <Chip 
                label="Add Publication" 
                icon={<Campaign />}
                style={{padding:'20px',paddingLeft:'50px',paddingRight:'50px',fontSize:'15px'}}
                />
            </Divider>

        </div>


        <form onSubmit={this.handleSubmit} encType="multipart/form-data" method="post" style={{width:'50%',marginTop:'20px'}}>
          <div>
            <TextField id="title" label="Title" variant="outlined" fullWidth onChange={this.handleTitleChange}/>
          </div>
          <br></br>
          <div>
            <TextField
                id="desc"
                label="Publication Description"
                multiline
                rows={4}
                defaultValue=""
                fullWidth
                onChange={this.handleDescChange}
            />
          </div>
          <br></br>
          

            <Chip label="Upload Publication Files" style={{width:'100%'}} /> <br/><br/>      

            <label htmlFor="file">
                <Input id="file" name="file" type="file" style={{display:'none'}} onChange={this.handleFileChange} />
                <div style={{display:'flex',justifyContent:'center'}}>
                  <Button variant="contained" component="span">
                      <CloudUpload />&nbsp; Upload
                  </Button>
                </div>
            </label>

            {
              this.state.file?
              <Chip label={this.state.file.name} style={{marginTop:'5px'}} onDelete={this.handleFileRemove} />
              :
              null
            }

            <Alert onClose={() => {}} variant="filled" id="alert" style={{marginTop:'10px',display:'none'}}>
            Successfully Published!
            </Alert><br/>

            <div style={{display:'flex',justifyContent:'center'}}>
              <Box sx={{ position: 'relative', display: 'inline-flex' }} id="progress" style={{marginTop:'10px',display:'none'}}>
              <CircularProgress variant="determinate" size={70} value={this.state.progressPrecentage}/>
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="caption"
                  component="div"
                  color="text.secondary"
                  fontSize={17}
                  fontWeight="bold"
                >{`${this.state.progressPrecentage}%`}</Typography>
              </Box>
            </Box>
          </div>

          <Button
            variant="contained"
            color="info"
            id="Submit"
            type="submit"
            fullWidth
            style={{margin:'0px', marginTop:'20px'}}
          >
            Publish
          </Button>

        </form>
      </div>
    );
  }
}
