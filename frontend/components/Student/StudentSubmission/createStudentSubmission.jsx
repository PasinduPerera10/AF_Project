import { React,Component } from "react";
import { Button, Chip, Input } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import { Button, TextField, Chip, Divider, Input, CircularProgress, Typography, Box, IconButton } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import CustomHeader from "../../header/customheader";
import axios from "axios";
import { InputLabel, Select,MenuItem } from "@mui/material";
import { CheckRounded, Add } from "@mui/icons-material";
import { Button, TextField, Chip, Divider, Alert, FormControl } from "@mui/material";
import AppBarNav from "../../AppBarNav";
import { getGroupByReg } from "../../../ApiCalls/group.apicall";

export default class CreateStudentSubmissionType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groupid: "",
      topic: "",
      uploaddate: Date().toLocaleString(),
      file: "",
      progressPrecentage: 0,
      assignmentTypes:[],
      currentgroup:""
    };
    this.handleSubmit.config = this.handleSubmit.bind(this);
  }

  handleGroupIdChange = (event) => {
    this.setState({ groupid: event.target.value });
  };

  handleTopicChange = (event) => {
    this.setState({ topic: event.target.value });
  };

  handleUploadDateChange = (event) => {
    this.setState({ uploaddate: event.target.value });
  };

  handleFileChange = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  handleFileRemove = (event) =>{
    this.setState({ file:'' });
  };

  async componentWillMount(){
    axios.get("http://localhost:3000/submissiontypes/").then(response =>
    {
      const data = response.data;
      this.handleData(data);
    });
    const groupid=await getGroupByReg(sessionStorage.getItem("RegId"))
    this.setState({currentgroup:groupid[0].groupId})
    console.log(groupid[0].groupId)
  }

  handleSelect(data){
    this.setState({
        selectedType: data._id,
        selectedType1: data.title,
    });
  }

  handleData(data){
    this.setState({
        assignmentTypes : data
    })
    console.log(data);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var completed = 0;
    const studentsubmission = {
      groupid: this.state.currentgroup,
      topic: this.state.topic,
      uploaddate: this.state.uploaddate,
      file: this.state.file,
      assignmentId: this.state.selectedType,
      assignmentTitle: this.state.selectedType1,
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

    axios.post("http://localhost:3000/studentsubmissions/new", studentsubmission, config).then(response =>
    {
      const data = response.data;
      if(response.data){
        alert("Assignment Successfully Submitted")
      }

      this.setState({
        assignmentTitle:[],
        selectedType : "",
        assignmentId: "",
        selectedType1 : "",
    });
    });
  };

  render() {
    return (
      <div>
        <AppBarNav></AppBarNav>

        <Divider><Chip label="Submit Your Document Submission" sx={{fontSize:'25px', margin:"10px", marginTop:'20px'}}></Chip></Divider>

        <div  style={{margin: "0 auto", alignItems:'center', textAlign:'center', width:'40%', border:'3px solid #73AD21', padding:'10px', marginTop:'10px'}}>
        <form onSubmit={this.handleSubmit} encType="multipart/form-data" method="post">
          <div>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Submission Type</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Assignment Type"
                fullWidth
                defaultValue="1"
            >
                {
                    this.state.assignmentTypes.map(data =>
                        <MenuItem value={data.title} key={data.title} onClick={(e) => this.handleSelect(data)}>{data.title}</MenuItem>
                    )
                }
            </Select>
            </FormControl>
        </div>
          <br></br>
          <div>
            <TextField variant="outlined" margin="normal" id="topic" label="Topic" style={{ width: 410 }} onChange={this.handleTopicChange} required/>
          </div>
          <br></br>
            <label htmlFor="contained-button-file">
  <Input accept="image/*" name="file" id="contained-button-file" margin="normal" multiple type="file" onChange={this.handleFileChange} required/>
</label>
            {
              this.state.file?
              <Chip label={this.state.file.name} style={{marginTop:'5px'}} onDelete={this.handleFileRemove} />
              :
              null
            }
            <Box sx={{ position: 'relative', display: 'inline-flex' }} id="progress" margin="normal" style={{marginTop:'10px',display:'none'}}>
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
                margin="normal"
              >{`${this.state.progressPrecentage}%`}</Typography>
            </Box>
          </Box>
<br></br>
          <Button variant="contained" color="success" id="Submit" margin="normal" type="submit">
            SUBMIT
          </Button>
        </form>
        </div>
      </div>
    );
  }
}