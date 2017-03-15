import React from 'react';
import ReactDOM from 'react-dom';
import GitHubIssue from './App';
import './index.css';

ReactDOM.render(
  <GitHubIssue pageIndex={1} perPage={5} />,
  document.getElementById('root')
);

