import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/sass/App.scss';
import * as serviceWorker from './serviceWorker';
import BrowserRouter from "react-router-dom/BrowserRouter";
import Router from "./router";
import axios from "./axios/index"
import $ from 'jquery';
import Url from "./url";
import { createBrowserHistory } from 'history';
import {getJwtToken,clearStorage} from './utils/cache'

$(document).ready(() => {

  const requestHandler = (config) => {
      let token = getJwtToken();
      if (token) {
          config.headers = {
              'User-Token': token
          };
      }
      return config;
  };

  const responseHandler = (response) => {
      return response;
  };

  const errorHandler = (error) => {
      if (error.response.status === 401) {
          clearStorage();
          const history = createBrowserHistory();
          history.push(Url.LOGIN);
          window.loggedInUser = null;
          window.location.reload(true);
      }
      return Promise.reject(error);
  };

  axios.interceptors.request.use(request => requestHandler(request));

  axios.interceptors.response.use(
      response => responseHandler(response),
      error => errorHandler(error)
  );

  window.renderDashboard = () => {
      ReactDOM.render(
          (
              <BrowserRouter>
                  <div>
                      <Router />
                  </div>
              </BrowserRouter>
          ), document.getElementById('content')
      );
  };

  
  window.renderNavBar = () => {
      ReactDOM.render(
          (
             <div/>
          ), document.getElementById('navbar')
      );
  };
  window.renderFooter = () => {
      ReactDOM.render(
          (
            <div/>
          ), document.getElementById('footer')
      );
  };

  

  
  window.renderDashboard();
  window.renderFooter();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
});

