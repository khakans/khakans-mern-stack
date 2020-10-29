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

  constructor(props) {
    super(props);
    
    this.state = {
      items: [],
      isLoaded: false
    };
  }

  componentDidMount = () => {
    axios.get('/api/users/Item')
      .then(response => {
        this.setState({ isLoaded: true, items: response.data });
        console.log('Data has been received!!');
      });
  };

  displayItem = (items, isLoaded) => {
    console.log(items);
    if (!isLoaded){ 
      return (<div style={{marginTop: "100px"}}>Loading data ... </div>)
    }
    return (items.map((item, index) =>
      <div key={index}>
        <h3>{item.name}</h3>
        <p>{item.price}</p>
        <p>{item.stock}</p>
      </div>
    ))
  };

  render() {
    // console.log('State: ', this.state);
    const { user } = this.props.auth;
    
    return (
      <div className="home">
        <div className="container">
          <div className="floatName"><p><b>hii,</b> {user.name.split(" ")[0]}</p></div>
          <button className="floatLogout" onClick={this.onLogoutClick}>Logout</button>
          <button className="floatCart" style={{fontWeight:"bolder"}}>Cart</button>
          <div>
            {this.displayItem(this.state.items, this.state.isLoaded)}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps,{ logoutUser })(Dashboard);