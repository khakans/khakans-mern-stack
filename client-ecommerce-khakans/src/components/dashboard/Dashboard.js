import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios';

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  
  state = {
    items: []
  }

  componentDidMount() {
      fetch('/api/users/Item')
      .then((response) => response.json())
      .then(itemsList => {
          this.setState({ items: itemsList.data });
      });
  }

  render() {
    const { user } = this.props.auth;
    const { items } = this.state;
    console.log(items);
    
  return (
    <div className="home">
      <div className="container">
        <div className="row">
        {items.map((item, index) => (
          <div key={index} className="col-xs-12 col-sm-6 col-md-3">
            <div className="box">
              <div className="card">
              <img className="card-img-top" src="http://placehold.it/300x300"/>
              <div className="card-body">
                <h4 className="card-title" style={{fontWeight: "bold"}}>{item.name}</h4>
                <p className="card-text">Price : {item.price}</p>
                <p className="card-text">Stock : {item.stock}</p>
                <a href="#" className="btn btn-primary">Add to Cart</a>
              </div>
              </div>
            </div>
          </div>
        ))}
        </div>
        <div className="floatName"><p><b>hii,</b> {user.name.split(" ")[0]}</p></div>
        <button className="floatLogout" onClick={this.onLogoutClick}>Logout</button>
        <button className="floatCart" style={{fontWeight:"bolder"}}>Cart</button>
      </div>
    </div>
  );
}}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps,{ logoutUser })(Dashboard);
