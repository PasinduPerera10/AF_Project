import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Chip, Divider, Card, CardContent,InputAdornment,OutlinedInput,FormHelperText } from "@mui/material";
import {
  Button,
  Chip,
  Divider,
  Typography,
  Grid,
  FormControl,
} from "@mui/material";
import AppBarNav from "../AppBarNav";
import axios from "axios";

export default class ViewSubmission extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      keyword: "",
    };

    this.currentLink = (window.location.href).split("/");
    this.id = this.currentLink[this.currentLink.length-1];
  }

  handleData(sdata){
    this.setState({
       data: sdata,   
    });
  }

  async componentDidMount() {
    const email = sessionStorage.getItem('loggedEmail');
    axios.post("http://localhost:3000/marking/getCustomS/"+email).then(response =>
    {
      const data = response.data;
      if(data != 'empty'){
        this.handleData(data);
      }
      console.log("ahb");
      console.log(data);
    });
  }

  handleKeyword=(event)=>{

    this.setState({keyword: event.target.value});

  }

  disable1=(data)=>{
      console.log(data);
      try{
          
        if(data==""){
            
            return false;
        }else if(data!=""){
            return true;
        }
      }catch(e){

      }
      return false;
  }

  disable2=(data)=>{

    console.log(data);
    try{
      if(data=""){
          return false;
      }else if(data!=""){
          return true;
      }
    }catch(e){

    }
    return false;
}


handleSupervisor=(data)=>{
  alert(data.topic)

}

handleSubmit(event) {
    event.preventDefault();
    let pointVal = [];
    this.state.data[0].marking.markingPoints.map(data =>{
      pointVal.push({
        [data.point]:{got:event.target.elements[data.point].value,max:data.marks}
      });
    });

    let marks = {
      submissionsId:event.target.elements.submissionsId.value,
      pointMarks:pointVal,
    }

    axios.post("http://localhost:3000/addMarks/save",marks).then(response =>
    {
      const data = response.data;
      console.log(data);
    });

    console.log(marks);

}

splitFile(dataS){
    console.log(dataS.split("/")[3]);
    return dataS.split("/")[3];
}

  render() {
    return (
      <div>
        <AppBarNav />

        <div style={{ marginTop: "40px" }}>
          <Divider>
            <Chip
              label="Assignment Marking"
              style={{
                padding: "20px",
                paddingLeft: "50px",
                paddingRight: "50px",
                fontSize: "15px",
              }}
            />
          </Divider>

          <div
            style={{
              justifyContent: "center",
              display: "flex",
              marginTop: "20px",
            }}
          >
            <Grid container>
              
                {this.state.data.map((data) => {
                return(
                    data.submissions.map((dataS) => 
                    

                <Grid item xs={6} key={dataS.groupid}>
                    <form onSubmit={(e) => this.handleSubmit(e)} name={dataS.assignmentId}>
                    <Card key={dataS.groupid}
                    sx={{ marginLeft: 4, marginTop: 4, marginRight: 4 }}
                    style={{
                        borderLeft: "3px solid #2e7d32",
                        display: "block",
                    }}
                    >
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                        GroupId: {dataS.groupid}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Topic: {dataS.topic}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Submission: <a target="_blank" href={"http://localhost:3000/"+(this.splitFile(dataS.file))}>Download</a>
                        </Typography>
                    </CardContent>
                    {
                        data.marking.markingPoints.map((data) => {
                            return(
                          
                          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                          <OutlinedInput
                            id="outlined-adornment-weight"
                            name={data.point}
                            endAdornment={<InputAdornment position="end">/{data.marks}</InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                              'aria-label': 'weight',
                            }}
                          />
                          <FormHelperText id="outlined-weight-helper-text">{data.point} marks</FormHelperText>
                        </FormControl>

                          )
                        })
                    }
                        <Button
                        variant="contained"
                        color="info"
                        id="submissionsId"
                        name="submissionId"
                        value={dataS._id}
                        type="submit"
                        fullWidth
                        style={{margin:'0px', marginTop:'0px',borderRadius:'0px'}}
                        >
                        Add
                        </Button>
                    </Card>
                    </form>
                </Grid>
        
                ))
                
    })}
    
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
