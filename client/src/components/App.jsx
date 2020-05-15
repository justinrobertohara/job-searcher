import React from 'react';
import axios from 'axios';
import Results from './Results.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: undefined,
      results: [],
      searchedBoolean: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let searchTerm = this.state.searchTerm;
    axios
      .get(`/github/api` + searchTerm)
      .then((response) => {
        this.setState({
          results: response.data,
          searchedBoolean: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    return (
      <div className="grid-container">
        <h1 className="text-center">Job Searcher</h1>
        <h4 className="text-center">...for Software Engineers</h4>
        <label className="text-center">
          What framework do you know?
          <textarea
            type="text"
            onChange={this.handleChange}
            placeholder="Search: React, Vue.js, Ruby on Rails"
          ></textarea>
        </label>
        <a
          className="button expanded"
          href="#"
          value={this.state.searchTerm}
          onClick={this.handleSubmit}
        >
          Search Github
        </a>
        {this.state.searchedBoolean === true && (
          <div>
            <h2>You have {this.state.results.length} results</h2>
            <Results results={this.state.results} />
          </div>
        )}
      </div>
    );
  }
}
