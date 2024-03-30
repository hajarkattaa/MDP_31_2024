import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import '@fontsource/roboto/300.css'; //light
import '@fontsource/roboto/400.css'; //default
import '@fontsource/roboto/500.css'; //semibold
import '@fontsource/roboto/700.css'; //bold
import './config/firebase';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
