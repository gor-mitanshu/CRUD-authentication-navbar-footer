import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
// Styles
import './index.css';
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Components
import App from './App';
import "bootstrap-icons/font/bootstrap-icons.css";
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
      <ToastContainer theme="colored" position="top-right" autoClose={ 3000 } hideProgressBar={ false } newestOnTop={ false } closeOnClick rtl={ false } draggable pauseOnHover />
    </Router>
  </React.StrictMode>
);