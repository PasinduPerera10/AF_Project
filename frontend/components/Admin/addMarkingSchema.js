import React from "react";
import { Component } from "react";

import { InputLabel, Select,MenuItem } from "@mui/material";
import { CheckRounded, Add } from "@mui/icons-material";

import { Button, TextField, Chip, Divider, Alert, FormControl } from "@mui/material";

import AppBarNav from "../AppBarNav";
import axios from "axios";

export default class AddPublications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedType:"",
      assignmentTypes:[],
      markingPoints: [],
    };
    this.handleSubmit.config = this.handleSubmit.bind(this);
    this.addMarkingPoint = this.addMarkingPoint.bind(this);
    this.handleData = this.handleData.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.count = -1;
  }

  handlePointRemove = (data) =>{
    var tempArr = [];
    for(let x of this.state.markingPoints){
        if(x.point != data){
            tempArr.push(x);
        }
    }
    this.setState({
        markingPoints: tempArr
    });
  };

  componentWillMount(){
    axios.get("http://localhost:3000/marking/get").then(response =>
    {
      const data = response.data;
      this.handleData(data);
    });
  }

  handleSelect(id){
    this.setState({
        selectedType: id
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
    
    const marking = {
      assignmentType: this.state.selectedType,
      markingPoints: this.state.markingPoints,
    };

    axios.post("http://localhost:3000/marking/save", marking).then(response =>
    {
      const data = response.data;
      document.getElementById("alert").style.display = "inline-flex";
      this.setState({
          assignmentType:[],
          selectedType : "",
      });
    });

  };

  addMarkingPoint(){
    event.preventDefault();
    var val = this.state.markingPoints;
    val.push({
      point:document.getElementById('point').value,
      marks:document.getElementById('marks').value
    });
    document.getElementById('point').value = "";
    document.getElementById('marks').value = "";
    this.setState({
        markingPoints: val
    });
    console.log(this.state.markingPoints);
}

  render() {

    return (
      <div className="registerForm">
        
        <AppBarNav />

        <div  style={{marginTop:'40px'}}>

            <Divider>
                <Chip 
                label="Add Marking" 
                icon={<CheckRounded />}
                style={{padding:'20px',paddingLeft:'50px',paddingRight:'50px',fontSize:'15px'}}
                />
            </Divider>

        </div>


        <form onSubmit={this.handleSubmit} method="post" style={{width:'50%',marginTop:'20px'}}>
          <div>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Assignment Type</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                fullWidth
                defaultValue="1"
            >
                {
                    this.state.assignmentTypes.map(data =>
                        <MenuItem value={data._id} key={data._id} onClick={(e) => this.handleSelect(data._id)}>{data.title}</MenuItem>
                    )
                }
            </Select>
            </FormControl>
          </div>
          <br></br>
          <div>
            <TextField
                id="point"
                label="Enter a Marking Point"
                style={{width:"50%"}}
                onChange={this.handleDescChange}
            />
            <TextField
                id="marks"
                label="Marks for the point"
                style={{width:"25%"}}
                onChange={this.handleDescChange}
            />
            <Button
            variant="contained"
            color="info"
            id="Submit"
            type="submit"
            onClick={this.addMarkingPoint}
            style={{width:'20%',padding:'16px 16px',marginLeft:'8px'}}
            >
                <Add/>
            </Button>
          </div>
            
            <br/>
            {
              this.state.markingPoints.length != 0?
                this.state.markingPoints.map(data => 
                    <Chip label={data.point+':'+data.marks} style={{marginTop:'5px',marginLeft:'3px'}} key={this.count++} onDelete={(e) => this.handlePointRemove(data.point)} />
                )
              :
              null
            }

            <Alert onClose={(e) => {}} variant="filled" id="alert" style={{marginTop:'15px',display:'none',width:'96%'}}>
            Successfully Added!
            </Alert>

          <Button
            variant="contained"
            color="info"
            id="Submit"
            type="submit"
            fullWidth
            onClick={this.handleSubmit}
            style={{margin:'0px', marginTop:'20px'}}
          >
            Add
          </Button>

        </form>
      </div>
    );
  }
}
