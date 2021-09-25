  
import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { configureStore } from "./Redux/store";

const store = configureStore();
ReactDOM.render(
  <Provider {...{ store }}>
    <BrowserRouter>
      <React.Fragment>
        <App />
        </React.Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));





serviceWorker.unregister();
