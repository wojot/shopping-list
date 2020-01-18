import React, { Component } from "react";
import { Toast, ToastHeader, ToastBody } from "reactstrap";

export default class ToastComponent extends Component {
  open = true;

  render() {
    setTimeout(() => {
      this.open = false;
      this.forceUpdate()
    }, this.props.delay);
  
    return (
      <Toast isOpen={this.open}>
        <ToastHeader>{this.props.title}</ToastHeader>
        <ToastBody>{this.props.msg}</ToastBody>
      </Toast>
    );
  }
}
