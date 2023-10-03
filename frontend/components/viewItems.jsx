import axios from "axios";
import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import { addItem, getAllItems, getAllItemsRaw } from "../restcall";
import "./login.module.css";
import axios from "axios";

export default class ViewItem extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      price: "",
      desc: "",
      uid: "",
      data: [],
    };
  }



  componentWillMount()
  {


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






  handleAddToCart = (event) => {
    

    alert(event.target.dataset.key);


  };

  handleAddToWishlist = (event) =>
  {
    
    alert(event.target.dataset.key);


  };




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
          <h2>View Items</h2>
          <Link to="/dashboard">
            <button className="buttonMargin">Dashboard</button>
          </Link>

          <Link to="/viewCart">
            <button className="buttonMargin">View Cart</button>
          </Link>

          <Link to="/">
            <button className="buttonMargin" onClick={this.handleLogout}>
              Logout
            </button>
          </Link>

          <hr></hr>
          {
            <table>
              <tbody>
                {this.state.data.map((item) => {
                  return (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.desc}</td>
                      <td>
                        <button data-key={item.id} onClick={this.handleAddToCart}>
                          ++Cart
                        </button>
                      </td>
                      <td>
                        <button data-key={item.id} onClick={this.handleAddToWishlist}>
                          ++Wishlist
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          }
        </div>
      </div>
    );
  }
}
