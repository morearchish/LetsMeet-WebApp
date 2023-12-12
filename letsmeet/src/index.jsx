import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Elitefit from './elitefit';
import reportWebVitals from './reportWebVitals';
// import './Sanju'
// import Sanju from './Sanju';
// import Elitefit from './elitefit';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <Elitefit /> */}
    {/* <Sanju /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
