import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

import './styles/global.css';
import './styles/hero.css';
import './styles/search-bar.css';
import './styles/results.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
