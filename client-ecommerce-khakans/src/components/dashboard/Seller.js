import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios';

class Seller extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  state = {
    name: '',
    price: '',
    stock: '',
    items: []
  };

  componentDidMount = () => {
    this.getItem();
  };

  getItem = () => {
    axios.get('/api/users/Item')
      .then((response) => {
        const data = response.data;
        this.setState({ items: data });
        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  }
  
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  submit = (event) => {
    event.preventDefault();

    const payload = {
      name: this.state.name,
      price: this.state.price,
      stock: this.state.stock,
    };


    axios({
      url: '/api/users/Item',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch(() => {
        console.log('Internal server error');
      });;
  };

  resetUserInputs = () => {
    this.setState({
      name: '',
      price: '',
      stock: ''
    });
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="Seller">
        <div className="container">
          <div className="floatName"><p><b>hii seller,</b> {user.name.split(" ")[0]}</p></div>
          <button className="floatLogout" onClick={this.onLogoutClick}>Logout</button>
          <button data-toggle="modal" data-target="#myModal" className="floatAdditem" style={{fontWeight:"bolder"}}>Add New Item</button>
          
          {/* The Modal */}
          <div className="modal" id="myModal" style={{marginTop: "100px"}}>
            <div className="modal-dialog">
              <div className="modal-content">
              
                {/* Modal Header */}
                <div className="modal-header">
                  <h5 className="modal-title">add new item below</h5>
                </div>
                
                {/* Modal body */}
                <div className="modal-body">
                  <form onSubmit={this.submit}>
                    <div className="form-input">
                      <input 
                        type="text"
                        name="name"
                        placeholder="Name of Product"
                        value={this.state.name}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-input">
                      <input 
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={this.state.price}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="form-input">
                      <input 
                        type="number"
                        name="stock"
                        placeholder="Stock"
                        value={this.state.stock}
                        onChange={this.handleChange}
                      />
                    </div>
                    <button>Submit</button>
                  </form>
                </div>
                
                {/* Modal footer */}
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Seller.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Seller);
