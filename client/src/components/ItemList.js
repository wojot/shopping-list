import React, { Component } from "react";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions";
import { Button } from "reactstrap";
import loading from "../loading.gif";
import Moment from "react-moment";
import "moment-timezone";
import PropTypes from "prop-types";

class ItemList extends Component {
  componentDidMount() {
    this.props.getItems();
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated && this.props.loading) this.props.getItems();
  }

  deleteItem = id => {
    this.props.deleteItem(id);
  };

  render() {
    return !this.props.isAuthenticated ? (
      <div>You are not authenticated</div>
    ) : !this.props.loading ? (
      <div>
        {this.props.items.map(item => (
          <div className="itemRow" key={item._id}>
            <Button color="danger" onClick={() => this.deleteItem(item._id)}>
              X
            </Button>{" "}
            {item.name} <small>({item._id}) Added on: <Moment format="DD.MM.YYYY HH:mm">{item.added}</Moment></small>
          </div>
        ))}
      </div>
    ) : (
      <div>
        <img src={loading} alt="loading" width="100px" />
      </div>
    );
  }
}

ItemList.propTypes = {
  items: PropTypes.array,
  loading: PropTypes.bool,
  status: PropTypes.number,
  msg: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  getItems: PropTypes.func,
  deleteItem: PropTypes.func
};

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
