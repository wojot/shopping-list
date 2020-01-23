import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import Logout from "./Logout";

const NavbarMenu = props => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const modules = props.isAuthenticated ? (

    <Fragment>
      <NavItem>
       <Logout />
      </NavItem>
    </Fragment>
  ) : (
    <Fragment>
      <NavItem>
        <LoginModal />
      </NavItem>
      <NavItem>
        <RegisterModal />
      </NavItem>
    </Fragment>
  );

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">Shopping List</NavbarBrand>
        <NavbarToggler onClick={toggle} /><span>{props.user ? `You are logged in as ${props.user.email}`:''}</span>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {modules}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, null)(NavbarMenu);
