import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// createRoot 대신 직접 render 사용
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// reportWebVitals는 React 16.7.0에서는 필요없으므로 제거
