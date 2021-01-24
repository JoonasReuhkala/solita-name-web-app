import ReactDOM from 'react-dom';
import './index.css';
import config from './config.json';
import App from './App.js';

ReactDOM.render(
  <App config = {config} />,
  document.getElementById('root')
);