import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NavLink,
  FormGroup,
  Label,
  Input,
  Form,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import { login, clearMsgs } from "../actions/authActions";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";

class LoginModal extends Component {
  state = { modal: false, email: "", password: "" };

  componentDidUpdate() {
    console.log(this.props)
    if (this.props.msgSuccessLogin) {
      this.toggle();
      toaster.notify(this.props.msgSuccessLogin, { duration: 3000 });
      this.props.clearMsgs();
      this.forceUpdate();
    }
  }

  toggle = () => this.setState({ modal: !this.state.modal });

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submit = e => {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    
    const userLoginData = { email, password };
    this.props.login(userLoginData);
  };

  render() {
    return (
      <div>
        <NavLink href="#" onClick={this.toggle}>
          Login
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className="modalBody">
            Login
          </ModalHeader>
          <ModalBody className="modalBody">
            {this.props.msgErrorLogin ? (
              <Alert color="danger">{this.props.msgErrorLogin}</Alert>
            ) : (
              ""
            )}
            <Form>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Type your e-mail"
                  onChange={this.handleInput}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Type your password"
                  onChange={this.handleInput}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter className="modalBody">
            <Button color="primary" onClick={this.submit}>
              Login
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  msgSuccessLogin: state.auth.msgSuccessLogin,
  msgErrorLogin: state.auth.msgErrorLogin,
  user: state.auth.user
});
const mapDispatchToProps = dispatch => ({
  login: userLoginData => dispatch(login(userLoginData)),
  clearMsgs: () => dispatch(clearMsgs())
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
