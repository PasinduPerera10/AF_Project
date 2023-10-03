import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { getAllItems, getAllItemsRaw } from "../restcall";
import "./login.module.css";
import axios from "axios";

export default class EditItem extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      price: "",
      desc: "",
      selected: "",
      data: [],
    };
  }

  componentWillMount() {
    const logged = sessionStorage.getItem("logged");
    if (logged == "false") {
      alert("User not logged in!");
      window.location.href = "/";
    }
  }

  handleItemName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleDesc = (event) => {
    this.setState({
      desc: event.target.value,
    });
  };

  handleItemPrice = (event) => {
    this.setState({
      price: event.target.value,
    });
  };

  

  componentWillMount() {
    const logged = sessionStorage.getItem("logged");

    if (logged == "false") {
      alert("User not logged in!");
      window.location.href = "/";
    }


  axios.get("http://localhost:3000/items/").then((response) => {
    const data = response.data;
    var items = [];

    const keys = Object.keys(data);

    for (var x in keys) {
      items.push({
        name: data[x][1].name,
        price: data[x][1].price,
        desc: data[x][1].desc,
        id: data[x][1].id,
        uid: data[x][1].uid,
      });
    }

    this.setState({ data: items });
  });

  setTimeout(() => {
    console.log(this.state.data);
  }, 500);



    }
    
  componentDidMount()
  {
    axios.get("http://localhost:3000/items/").then((response) =>
    {
      const data = response.data;
      var items = [];

      const keys = Object.keys(data);
      
      for (var x in keys)
      {
        items.push({
          name: data[x][1].name,
          price: data[x][1].price,
          desc: data[x][1].desc,
          id: data[x][1].id,
          uid: data[x][1].uid
        });
      }

      this.setState({data:items});
    }
    );

    setTimeout(() => {
      console.log(this.state.data);
    }, 500);
    
      
    }

  handleLogout = (event) => {
    sessionStorage.setItem("logged", "false");

    sessionStorage.setItem("loggedName", "NotLogged!");
    sessionStorage.setItem("loggedEmail", "NotLogged!");
    sessionStorage.setItem("loggedRole", "NotLogged!");

    sessionStorage.clear;
    window.location.href = "/";
  };

  render() {
    return (
      <div>
        <div className="loginForm">
          <h2>Edit Items</h2>
          <Link to="/dashboard">
            <button className="buttonMargin">Dashboard</button>
          </Link>

          <Link to="/addItems">
            <button className="buttonMargin">Add Items</button>
          </Link>

          <Link to="/">
            <button className="buttonMargin" onClick={this.handleLogout}>
              Logout
            </button>
          </Link>

          <hr></hr>
          <form>
            <div>
              <label>Select Item</label>
              
            </div>
            <div>
              <label>Item Name</label>
              <input type="text" onChange={this.handleItemName}></input>
            </div>
            <div>
              <label>Item Price</label>
              <input type="number" onChange={this.handleItemPrice}></input>
            </div>
            <div>
              <label>Description</label>
              <input type="text" onChange={this.handleDesc}></input>
            </div>

            <button className="buttonMargin">+Edit Item</button>
          </form>
        </div>
      </div>
    );
  }
}
