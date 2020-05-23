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

$(document).ready(() => {

  const requestHandler = (config) => {
      let token = window.getJwtToken();
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
          window.clearStorage();
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


  window.getJwtToken = () => window.localStorage.getItem('token');

  window.storeToken = (token) => {
      window.localStorage.setItem('token', token);
  };

  window.clearStorage = () => {
      window.localStorage.clear();
      window.sessionStorage.clear();
  };

  window.setRefreshToken = (refreshToken) => window.localStorage.setItem('refreshToken', refreshToken);

  window.getRefreshToken = () => window.localStorage.getItem('refreshToken');

  window.setTokenExpiry = (tokenExpiresAt) => window.localStorage.setItem('tokenExpiresAt', tokenExpiresAt);

  window.getTokenExpiry = () => window.localStorage.getItem('tokenExpiresAt');

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

