import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css'; 

class GitHubIssue extends Component {
  constructor(props){
    super(props);
    this.fetchIssue = this.fetchIssue.bind(this);
    this.perPage = props.perPage;
    this.state = {
	pageIndex : props.pageIndex,
    	issues : undefined,
    }
  }

  componentDidMount() {
    this.fetchIssue();
  }

  fetchIssue() {
    var pageIndexToLoad = this.state.pageIndex;
    var issuePerPage = this.perPage;
    fetch(`https://api.github.com/repos/rails/rails/issues?page=${pageIndexToLoad}&per_page=${issuePerPage}`)
    .then((response) => {
      if(response.ok) {
       return response.json();
      }
      return [];
    }).then((issues) => {
      this.setState({pageIndex : pageIndexToLoad + 1, issues: issues});
    }).catch((error) => {
    	console.log('Error happened while fetching issue: ' + error.message);
    });
  }
 
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
	<IssueList issues={this.state.issues} />
	<NextButton onClick={this.fetchIssue} />
      </div>
    );
  }
}

function IssueList(props) {
  if(props.issues === undefined) {
    return <ul></ul>;
  }
  if(props.issues.length === 0) {
    return <p>No issues</p>;
  }
  return <ul className="App-issue-list">
	  {props.issues.map((issue) => <Issue key={issue.id} issue={issue}></Issue>)}
	</ul>;

}

function Issue(props) {
  function hightLightIssue(e){
    var allSibling = e.target.parentElement.children;
    for(var sibling of allSibling) {
      sibling.className =  "App-Issue-Item-Unclicked";
    }
    e.target.className  = "App-Issue-Item-Clicked";
  }

  return <li className="App-Issue-Item-Unclicked" onClick={hightLightIssue}>#{props.issue.id} - {props.issue.title}</li>;
}

function NextButton(props) {
  return <button onClick={props.onClick}>Next</button>;
}

export default GitHubIssue;

