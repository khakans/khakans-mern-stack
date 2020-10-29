import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Buyer extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="Seller">
        <div className="container">
          <div className="jumbotron">
            <h3>Hi, {user.name}</h3><br/>
          </div>
          <div className="floatName"><p><b>hii buyer,</b> {user.name.split(" ")[0]}</p></div>
          <button className="floatLogout" onClick={this.onLogoutClick}>Logout</button>
          <button className="floatCart" style={{fontWeight:"bolder"}}>Cart</button>
        </div>
      </div>
    );
  }
}

Buyer.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Buyer);
