import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

import { Button, Chip, Divider, Card, CardContent } from "@mui/material";
import { Campaign, FileDownload, Edit, Delete, Add} from "@mui/icons-material";

import { Button, Fab, Chip, Divider, Typography, CardActions } from "@mui/material";
import { Campaign, CloudUpload } from "@mui/icons-material";

import AppBarNav from "./../AppBarNav";
import axios from "axios";

export default class ManagePublications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data : []
    };
    this.handleData = this.handleData.bind(this);
  }

  handleData(pdata){
    this.setState({
      data:pdata
    });
  }

  loadData(){
    axios.post("http://localhost:3000/publication/getAll").then(response =>
    {
      this.handleData(response.data);
    });
  }

  handleDelete(id){
    axios.get("http://localhost:3000/publication/delete?id="+id).then(response =>
    {
      this.loadData();
    });
  }

  componentDidMount(){
    axios.post("http://localhost:3000/publication/getAll").then(response =>
    {
      this.handleData(response.data);
    });
  }

  render() {

    return (
      <div className="registerForm">
        
        <AppBarNav />

        <div  style={{marginTop:'40px'}}>

            <Divider>
                <Chip 
                label="Publications" 
                icon={<Campaign />}
                style={{padding:'20px',paddingLeft:'50px',paddingRight:'50px',fontSize:'15px'}}
                />
            </Divider>

            <div style={{justifyContent:'right',display:'flex',marginTop:'20px',marginRight:'20px'}}>
                <Link to={'/addPublications'} style={{textDecoration:'inherit'}}>
                        <Fab variant="extended" size="medium" color="primary" aria-label="add">
                            <Add sx={{ mr: 1 }} />
                            Add
                        </Fab>
                </Link>
            </div>

            <div style={{justifyContent:'center',display:'grid'}}>

              {
                (this.state.data).map(data => 
                  <Card sx={{ width: 645 }} style={{borderLeft:'3px solid #2e7d32',marginTop:'20px'}}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {data.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {data.desc}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <a href={"http://localhost:3000/" + data.file} target="_blank">
                        <Button variant="outlined" size="small"><FileDownload/> Download</Button>
                      </a>&nbsp;&nbsp;
                      <Link to={'/editPublications/'+data._id} style={{textDecoration:'inherit',margin:'0px'}}>
                        <Button variant="outlined" size="small" color="warning"><Edit/></Button>
                      </Link>&nbsp;&nbsp;
                      <Button variant="outlined" onClick={(e) => this.handleDelete(data._id)} size="small" color="error"><Delete/></Button>
                    </CardActions>
                  </Card>
                )
              }
              
            </div>
        </div>
      </div>
    );
  }
}