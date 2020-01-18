import React, { Component } from "react";
import "./App.css";
import ItemList from "./components/ItemList";
import AddItem from "./components/AddItem";
import NavbarMenu from './components/NavbarMenu'
// import ToastComponent from './components/ToastComponent'

import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));   //develop
// const store = createStore(rootReducer, applyMiddleware(thunk));                                                                                       //production

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <NavbarMenu />
          {/* <ToastComponent msg="test" title="Temat" delay={1000} /> */}
          <AddItem />
          <ItemList />
        </div>
      </Provider>
    );
  }
}
