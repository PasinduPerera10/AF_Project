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

export default class ViewMySubmissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : [],
      markData: [],
    };
    this.handleData = this.handleData.bind(this);
  }

  async handleData(ssubdata){
    this.setState({
      data:ssubdata
    });
    console.log(ssubdata);
  }

  async handleDataMarks(ssubdata){
    this.setState({
      markData:ssubdata
    });
    console.log(ssubdata);
  }

  async loadData(){
    axios.get("http://localhost:3000/submissiontypes").then(response =>
    {
      this.handleData(response.data);
    });
  }

  async handleDelete(id){
    axios.delete(`http://localhost:3000/submissiontypes/${id}`).then(response =>
    {
      this.loadData();
    });
  }

  async componentDidMount(){
    const reg = sessionStorage.getItem("RegId");
    axios.get("http://localhost:3000/studentsubmissions/filterByGroup/"+reg).then(response =>
    {
      this.handleData(response.data);
    });

    axios.post("http://localhost:3000/addMarks/get").then(response =>
    {
      this.handleDataMarks(response.data);
    });

  }

  calMarks(marks){
    let total =  0;
    let max = 0;

    for(let i = 0; i < marks.length;i++){
        total += parseInt(marks[i][Object.keys(marks[i])].got);
        max += parseInt(marks[i][Object.keys(marks[i])].max);
    }

    return total + '/' + max;
    
  }

  render() {
    return (
      <div>
        <AppBarNav></AppBarNav>

        <Divider><Chip label="My Submissions" sx={{fontSize:'18px', margin:"10px", marginBottom:'20px', marginTop:'20px'}}></Chip></Divider>

       <Grid container>
        {(this.state.data).map(data =>
        <Grid xs={4} item>
        <Card sx={{ margin: "5px"}} style={{borderLeft:'3px solid #2e7d32'}}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                     <div style={{textAlign:'center', fontFamily:"sans-serif"}}><b>{data.assignmentTitle}</b></div>
                      </Typography>
                      <Typography variant="h7" color="text.secondary">
                        <div style={{textAlign:'center'}}>Submitted : {data.uploaddate}</div>
                      </Typography>      
          <br></br>
                    </CardContent>
                    {
                      this.state.markData.map((markData) => 
                        {
                          return (
                          markData.submissionId == data._id?
                            <Typography variant="h7" color="text.secondary">
                            <div style={{textAlign:'center', fontWeight:'bold',marginBottom:'10px'}}>Marks : {this.calMarks(markData.pointMarks)}</div>
                          </Typography>  
                          :
                          
                          <Typography variant="h7" color="text.secondary">
                            <div style={{textAlign:'center', fontWeight:'bold',marginBottom:'10px'}}>Not Marked Yet</div>
                          </Typography>

                          )
                        }
                      )
                    }
                  </Card>
                  </Grid>
        )}
        </Grid>
      </div>
    );
  }
}