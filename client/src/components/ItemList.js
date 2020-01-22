import React, { Component } from "react";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions";
import { Button } from "reactstrap";
import loading from "../loading.gif";

class ItemList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  deleteItem = id => {
    this.props.deleteItem(id);
  };

  render() {
    if (!this.props.isAuthenticated) {
      return <div>You are not authenticated</div>;
    } else {
      if (!this.props.loading) {
        return (
          <div>
            {this.props.items.map(item => (
              <div className="itemRow" key={item._id}>
                <Button
                  color="danger"
                  onClick={() => this.deleteItem(item._id)}
                >
                  X
                </Button>{" "}
                {item.name} <small>({item._id})</small>
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <div>
            <img src={loading} alt="loading" width="100px" />
          </div>
        );
      }
    }
  }
}

const mapStateToProps = state => ({
  items: state.items.items,
  loading: state.items.loadingItems,
  status: state.items.status,
  msg: state.items.msg,
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  getItems: () => dispatch(getItems()),
  deleteItem: id => dispatch(deleteItem(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
