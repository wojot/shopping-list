import React, { Component } from "react";
import "./App.css";
import ItemList from "./components/ItemList";
import AddItem from "./components/AddItem";
import NavbarMenu from "./components/NavbarMenu";

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import {loadUser} from './actions/authActions'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
); //develop
// const store = createStore(rootReducer, applyMiddleware(thunk)); //production


export default class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser())
  }

  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <NavbarMenu /><br />
          <AddItem />
          <ItemList />
        </div>
      </Provider>
    );
  }
}
