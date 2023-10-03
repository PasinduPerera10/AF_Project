import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Chip, Divider, Card, CardContent } from "@mui/material";
import {
  Button,
  Chip,
  Divider,
  Typography,
  Grid,
} from "@mui/material";
import AppBarNav from "../AppBarNav";
import axios from "axios";

export default class MarkSubmissions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      keyword: "",
    };

    this.handleKeyword=this.handleKeyword.bind(this);
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
      
      this.handleData(data);
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

handleCosupervisor=(data)=>{

    
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
              {this.state.data.map((data) => (
                <Grid item xs={6} key={data.groupid}>
                  <Card key={data.groupid}
                    sx={{ marginLeft: 4, marginTop: 4, marginRight: 4 }}
                    style={{
                      borderLeft: "3px solid #2e7d32",
                      display: "block",
                    }}
                  >
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        Assignment Title: {data.assignment.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        DeadLine: {data.assignment.deadline}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Submissions: {data.submissions.length}
                      </Typography>
                    </CardContent>
                        <Link to={"/viewSubmission/"+data.assignment._id}>
                            
                        {data.submissions.length > 0 ?
                        
                        <Button
                        variant="contained"
                        color="info"
                        id="Submit"
                        type="submit"
                        fullWidth
                        style={{margin:'0px', marginTop:'0px',borderRadius:'0px'}}
                        >
                          Start Marking
                        </Button>

                          :null
                        }
                      </Link>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
