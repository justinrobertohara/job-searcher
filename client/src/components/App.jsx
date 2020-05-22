import React from 'react';
import axios from 'axios';
import Results from './Results.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: undefined,
      location: undefined,
      results: [],
      searchedBoolean: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let searchTerm = this.state.searchTerm;
    let location = this.state.location;

    let searchSpecifications = {
      searchTerm: searchTerm,
      location: location,
    };

    console.log(searchSpecifications);
    axios
      .post('/github/api', { data: searchSpecifications })
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

  checkBox(event) {
    console.log(event.target.id);
  }

  handleChange(event) {
    let key = event.target.name;

    this.setState({ [key]: event.target.value });
  }

  render() {
    return (
      <div className="grid-container">
        <h1 className="text-center">Job Searcher</h1>
        <h4 className="text-center">...for Software Engineers</h4>
        <div className="row">
          <div className="large-4 columns">
            <label>
              What framework do you know?
              <input
                type="text"
                onChange={this.handleChange}
                name="searchTerm"
                placeholder="Search: React, Vue.js, Ruby on Rails"
              />
            </label>
          </div>
          <div className="large-4 columns">
            <label>
              Location
              <input
                type="text"
                name="location"
                onChange={this.handleChange}
                placeholder="City name, Zip code, or other location search term."
              />
            </label>
          </div>
          <div className="large-4 columns">
            <fieldset className="medium-6 cell">
              <legend>Full Time </legend>
              <input id="fullTime" type="checkbox" onChange={this.checkBox} />
              <label htmlFor="checkbox1">Full Time</label>
              <input id="partTime" type="checkbox" onChange={this.checkBox} />
              <label htmlFor="checkbox2">Part Time</label>
              <input id="noPref" type="checkbox" onChange={this.checkBox} />
              <label htmlFor="checkbox3">No Preference</label>
            </fieldset>
          </div>
        </div>
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
