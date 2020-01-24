import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Alert,
  NavLink,
  Form
} from "reactstrap";
import { connect } from "react-redux";
import { register, registerError, clearMsgs } from "../actions/authActions";
import toaster from "toasted-notes";
import "toasted-notes/src/styles.css";
import PropTypes from "prop-types";

class RegisterModal extends Component {
  state = {
    modal: false,
    email: "",
    password: "",
    passwordConfirm: "",
    wrongConfirm: false,
    msgSuccessRegister: "",
    msgErrorRegister: "",
    isAuthenticated: false
  };

  componentDidUpdate() {
    if (this.props.msgSuccessRegister) {
      this.toggle();
      toaster.notify(this.props.msgSuccessRegister, { duration: 3000 });
      this.props.clearMsgs();
    }
  }

  toggle = () => this.setState({ modal: !this.state.modal });

  handleEmail = e => {
    this.setState({ email: e.target.value });
  };

  handlePassword = e => {
    this.setState({ password: e.target.value });
  };

  handlePasswordConfirm = e => {
    if (e.target.value !== this.state.password) {
      this.setState({ wrongConfirm: true });
    } else {
      this.setState({ wrongConfirm: false });
    }

    this.setState({ passwordConfirm: e.target.value });
  };

  onSubmit = () => {
    const { email, password, passwordConfirm } = this.state;
    if (password === passwordConfirm) {
      const user = { email, password };
      this.props.register(user);
    } else {
      this.props.registerError(400, "Password are not the same!");
    }
  };

  render() {
    return (
      <div>
        <NavLink href="#" onClick={this.toggle}>
          Register
        </NavLink>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className="modalBody"
        >
          <ModalHeader toggle={this.toggle} className="modalBody">
            Registration
          </ModalHeader>
          <ModalBody className="modalBody">
            {this.props.msgErrorRegister ? (
              <Alert color="danger">{this.props.msgErrorRegister}</Alert>
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
                  placeholder="Please input your email"
                  onChange={this.handleEmail}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Please input your password"
                  onChange={this.handlePassword}
                />
              </FormGroup>
              <FormGroup>
                <Label for="passwordConfirm">
                  Password confirmation{" "}
                  {this.state.wrongConfirm
                    ? "(Password confirmation must be ident to password!)"
                    : ""}
                </Label>
                <Input
                  type="password"
                  name="passwordConfirm"
                  id="passwordConfirm"
                  placeholder="Please retype your password"
                  onChange={this.handlePasswordConfirm}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter className="modalBody">
            <Button color="primary" onClick={this.onSubmit}>
              Register
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

RegisterModal.propTypes = {
  msgErrorRegister: PropTypes.string,
  msgSuccessRegister: PropTypes.string,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  msg: PropTypes.string,
  register: PropTypes.func,
  registerError: PropTypes.func,
  clearMsgs: PropTypes.func
};

const mapStateToProps = state => ({
  msgErrorRegister: state.auth.msgErrorRegister,
  msgSuccessRegister: state.auth.msgSuccessRegister,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  msg: state.auth.msg
});

const mapDispatchToProps = dispatch => ({
  register: user => dispatch(register(user)),
  registerError: (status, msg) => dispatch(registerError(status, msg)),
  clearMsgs: () => dispatch(clearMsgs())
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
