import React, { Component } from "react";
import { connect } from "react-redux";
import { getItems, deleteItem, loadItems } from "../actions";
import { Button } from "reactstrap";

class ItemList extends Component {
    
  componentDidMount() {
    this.props.getItems();
    this.props.loadItems();
    console.log(this.props)
  }

  deleteItem = id => {
    this.props.deleteItem(id);
  };

  render() {
    console.log(this.props.loading)
    return (
      <div>
      
        {this.props.items.map(item => (
          <div className="itemRow" key={item._id}>
            <Button color="danger" onClick={() => this.deleteItem(item._id)}>
              X
            </Button>{" "}
            {item.name} <small>({item._id})</small>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.items.items,
  loading: state.loadingItems
});

const mapDispatchToProps = dispatch => ({
  getItems: () => dispatch(getItems()),
  deleteItem: id => dispatch(deleteItem(id)),
  loadItems: () => dispatch(loadItems())
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
