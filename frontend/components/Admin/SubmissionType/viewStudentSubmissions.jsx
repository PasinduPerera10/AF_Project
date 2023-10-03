import { React, Component } from "react";
import { Button} from "@mui/material";
import { Campaign, FileDownload } from "@mui/icons-material";
import { Campaign, CloudUpload } from "@mui/icons-material";
import CustomHeader from "../../header/customheader";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Chip, Divider, Card, CardContent } from "@mui/material";
import { Campaign, FileDownload } from "@mui/icons-material";
import { Button, TextField, Chip, Divider, Typography, CardActions } from "@mui/material";
import AppBarNav from "../../AppBarNav";

export default class ViewStudentSubmission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : []
    };
    this.handleData = this.handleData.bind(this);
  }

handleData(subdata){
    this.setState({
      data:subdata
    });
  }

loadData(){
    axios.get("http://localhost:3000/studentsubmissions").then(response =>
    {
      this.handleData(response.data);
    });
  }

handleDelete(id){
    axios.delete(`http://localhost:3000/studentsubmissions/${id}`).then(response =>
    {
      this.loadData();
    });
  }

  async componentDidMount(){
    axios.get("http://localhost:3000/studentsubmissions").then(response =>
    {
      this.handleData(response.data);
      console.log(response.data)
    });
  }

  render() {
    return (
      <div>
        <AppBarNav></AppBarNav>

        <Divider><Chip label="View Submitted document Submissions" sx={{fontSize:'25px', margin:"10px", marginBottom:'20px', marginTop:'20px'}}></Chip></Divider>

        {(this.state.data).map(data => 
        <Card sx={{ width:"27%", height: 300, float:"left", marginLeft:4, marginTop:4, marginRight:4 }} style={{border:'1px solid #2e7d32'}}>
                    <CardContent>
                     <Typography gutterBottom variant="h5" component="div">
                     <div style={{textAlign:'center', color:'blue'}}>{data.assignmentTitle}</div>
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                     <div style={{textAlign:'center', color:'blue'}}>Group ID: {data.groupid}</div>
                      </Typography>
                      <Typography variant="h6" color="">
                      <div style={{textAlign:'center', marginBottom:"10px"}}>Topic : {data.topic}</div>
                      </Typography>
                      <Typography variant="h7" color="red">
                      <div style={{textAlign:'center'}}>Uplaod Date : {data.uploaddate}</div>
                      </Typography>
                      <CardActions
                      sx={{ margin: "0 auto", justifyContent: "center" }}>
                      <Typography variant="body2" color="text.secondary">
                      <a href={"http://localhost:3000/" + (data.file.split("/"))[3]} style={{textDecoration:'none'}} target="_blank">
                        <Button variant="contained" size="small" style={{marginTop:'12%', textDecoration:'inherit'}}><FileDownload/> Download Assignment</Button>
                      </a>
                      </Typography>
                      </CardActions>
                      <br></br>
                    </CardContent>
                  </Card>
        )}
      </div>
    );
  }
}