import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import { NavLink } from "reactstrap";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import PropTypes from "prop-types";

class Logout extends Component {
  handleLogout = () => {
    this.props.logout();
    toaster.notify("Logged out successfully", { duration: 1000 });
  };

  render() {
    return (
      <NavLink href="#" onClick={this.handleLogout}>
        Logout
      </NavLink>
    );
  }
}

Logout.propTypes = {
  logout: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});
export default connect(null, mapDispatchToProps)(Logout);
