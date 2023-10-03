import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Chip, Divider, Card, CardContent } from "@mui/material";
import {
  Button,
  TextField,
  Chip,
  Divider,
  Typography,
  CardActions,
  Grid,
} from "@mui/material";
import AppBarNav from "../AppBarNav";
import axios from "axios";
import { getTopics, updateSupervisor } from "../../ApiCalls/topic.apicall";
import { textAlign } from "@mui/system";

export default class SupervisorAccept extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      keyword: "",
    };

    this.handleKeyword=this.handleKeyword.bind(this);
  }

  async componentDidMount() {
    const data = await getTopics();
    this.setState({ data: data });

    setTimeout(() => {
      console.log(data);
    }, 1000);
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


handleSupervisor=async (data)=>{
  console.log(data)

 const update= {
    groupid:data.groupid,
    supervisor: sessionStorage.getItem("loggedEmail")
    }

    const result=await updateSupervisor(update);
    window.location.href="/supervisor"

}

handleCosupervisor=async (data)=>{
  console.log(data)

  const update= {
     groupid:data.groupid,
     cosupervisor: sessionStorage.getItem("loggedEmail")
     }
 
     const result=await updateSupervisor(update);
     window.location.href="/supervisor"
    
}


getButtons=(data)=>{

  const supervisor=data.data.supervisor==""?false:true
  const cosupervisor=data.data.cosupervisor==""?false:true

  console.log("super: "+supervisor);
  console.log("cosuper: "+cosupervisor);


   return (<><Button
                        variant="outlined"
                        size="small"
                        topicid={data._id}
                        disabled={supervisor}
                        onClick={this.handleSupervisor.bind(this, data.data)}
                      >
                        Accept As Supervisor
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        topicid={data._id}
                        disabled={cosupervisor}
                        onClick={this.handleCosupervisor.bind(this, data.data)}
                      >
                        Accept As Co-Supervisor
                      </Button></>);

}

  render() {
    return (
      <div>
        <AppBarNav />

        <div style={{ marginTop: "40px" }}>
          <Divider>
            <Chip
              label="Supervisors"
              style={{
                padding: "20px",
                paddingLeft: "50px",
                paddingRight: "50px",
                fontSize: "15px",
              }}
            />
          </Divider>

          <div style={{textAlign:"center"}}>
            <TextField
              placeholder="Search topic.."
              variant="outlined"
              type="text"
              value={this.state.keyword}
              onChange={this.handleKeyword}
              sx={{margin:"10px"}}
            />
          </div>

          <div
            style={{
              justifyContent: "center",
              display: "flex",
              marginTop: "20px",
            }}
          >
            <Grid container>
              {this.state.data.filter((value)=>{
                  if(this.state.keyword==""){
                      return value;
                  }else if (value.topic.toLowerCase().includes(this.state.keyword.toLowerCase())){
                      return value;
                  }


              }).map((data) => (
                <Grid item xs={6} key={data.groupid}>
                  <Card key={data.groupid}
                    sx={{ marginLeft: 4, marginTop: 4, marginRight: 4 }}
                    style={{
                      borderLeft: "3px solid #2e7d32",
                      display: "block",
                    }}
                  >
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {data.topic}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Group: {data.groupid}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{ margin: "0 auto", justifyContent: "center" }}
                    >
                      
                        <this.getButtons data={data}></this.getButtons>



                    </CardActions>
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
