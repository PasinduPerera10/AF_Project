import { React, Component } from "react";
import { Button, Grid} from "@mui/material";
import { Campaign, FileDownload } from "@mui/icons-material";
import { Campaign, CloudUpload } from "@mui/icons-material";
import CustomHeader from "../../header/customheader";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Chip, Divider, Card, CardContent } from "@mui/material";
import { Campaign, FileDownload } from "@mui/icons-material";
import { Button, TextField, Chip, Divider, Typography, CardActions } from "@mui/material";
import AppBarNav from "../../AppBarNav";

export default class ViewSubmissionTypes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : []
    };
    this.handleData = this.handleData.bind(this);
  }

handleData(ssubdata){
    this.setState({
      data:ssubdata
    });
  }

loadData(){
    axios.get("http://localhost:3000/submissiontypes").then(response =>
    {
      this.handleData(response.data);
    });
  }

handleDelete(id){
    axios.delete(`http://localhost:3000/submissiontypes/${id}`).then(response =>
    {
      this.loadData();
    });
  }

  async componentDidMount(){
    axios.get("http://localhost:3000/submissiontypes").then(response =>
    {
      this.handleData(response.data);
    });
  }

  render() {
    return (
      <div>
        <AppBarNav></AppBarNav>

        <Divider><Chip label="List of Submission Types" sx={{fontSize:'25px', margin:"10px", marginBottom:'20px', marginTop:'20px'}}></Chip></Divider>

       <Grid container>
        {(this.state.data).map(data =>
        <Grid xs={4} item>
        <Card sx={{ margin: "5px"}} style={{borderLeft:'3px solid #2e7d32'}}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                     <div style={{textAlign:'center', fontFamily:"sans-serif"}}><b>{data.title}</b></div>
                      </Typography>
                      <Typography variant="h7" color="text.secondary">
                        <div style={{textAlign:'center', color:'red'}}>Deadline : {data.deadline}</div>
                      </Typography>      
          <br></br>
                    </CardContent>
                    <CardActions>
                    <a href="/createStudentSubmission" style={{textDecoration:'none'}}><Button variant="contained" margin="normal" type="submit" style={{marginLeft:'100px', marginBottom:'10px', marginTop:'10px',textDecoration:'none'}}>
            UPOLAD DOCUMENT
          </Button></a>
                    </CardActions>
                  </Card>
                  </Grid>
        )}
        </Grid>
      </div>
    );
  }
}