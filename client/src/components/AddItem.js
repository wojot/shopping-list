import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Input,
  FormGroup
} from "reactstrap";
import { connect } from "react-redux";
import { addItem } from "../actions";

const AddItem = props => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");

  const toggle = () => setModal(!modal);
  const handleName = e => setName(e.target.value);
  const addNewItem = () => {
    props.addItem(name);
    toggle();
  };

  return (
    <div>
      <Button color="primary" onClick={toggle}>
        Add new
      </Button>
      <Modal isOpen={modal} toggle={toggle} className="modalBody">
        <ModalHeader toggle={toggle} className="modalBody">
          Add new item {name}
        </ModalHeader>
        <ModalBody className="modalBody">
          <FormGroup>
            <Label for="name">Name:</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="New name of item"
              onChange={handleName}
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter className="modalBody">
          <Button color="primary" onClick={addNewItem}>
            Add new
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addItem: name => dispatch(addItem(name))
});

export default connect(undefined, mapDispatchToProps)(AddItem);
