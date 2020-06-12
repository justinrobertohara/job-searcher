import React from 'react';
import axios from 'axios';
import Results from './Results.jsx';
import SavedListings from './SavedListings.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      location: '',
      fullTime: '',
      results: [],
      savedListings: [],
      savedListingsBoolean: false,
      searchedBoolean: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkBox = this.checkBox.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.savedListingsBoolean = this.savedListingsBoolean.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let searchSpecifications = {
      searchTerm: this.state.searchTerm,
      location: this.state.location,
      fullTime: this.state.fullTime,
    };

    axios
      .post('/github/api', { data: searchSpecifications })
      .then((response) => {
        this.setState({
          results: response.data,
          searchedBoolean: true,
          savedListingsBoolean: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleChange(event) {
    let key = event.target.name;
    this.setState({ [key]: event.target.value });
  }

  checkBox(event) {
    let opportunity = event.target.id;
    if (opportunity === 'fullTimeOpportunity') {
      this.setState({
        fullTime: true,
      });
    } else {
      this.setState({
        fullTime: false,
      });
    }
  }

  clearSearch() {
    this.setState({
      searchTerm: '',
      location: '',
      fullTime: '',
      results: [],
      searchedBoolean: false,
      savedListingsBoolean: false,
    });
  }

  savedListingsBoolean() {
    this.setState({
      searchTerm: '',
      location: '',
      fullTime: '',
      results: [],
      searchedBoolean: false,
      savedListingsBoolean: !this.state.savedListingsBoolean,
    });
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
                value={this.state.searchTerm}
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
                value={this.state.location}
                onChange={this.handleChange}
                placeholder="City name, Zip code, or other location search term."
              />
            </label>
          </div>

          <fieldset className="large-5 cell">
            <legend>Full Time Opportunity</legend>
            <input
              type="radio"
              name="opportunity"
              value={this.state.fullTime}
              id="fullTimeOpportunity"
              onChange={this.checkBox}
              required
            />
            <label htmlFor="fullTimeOpportunity">Full Time</label>
            <input
              type="radio"
              name="opportunity"
              value="partTime"
              id="partTimeOpportunity"
              onChange={this.checkBox}
            />
            <label htmlFor="partTimeOpportunity">Part Time</label>
            <input
              type="radio"
              name="opportunity"
              value="noPref"
              id="noPrefOpportunity"
              onChange={this.checkBox}
            />
            <label htmlFor="noPrefOpportunity">No Preference</label>
          </fieldset>
        </div>
        <a
          className="button expanded"
          href="#"
          value={this.state.searchTerm}
          onClick={this.handleSubmit}
        >
          Search Github
        </a>
        <a
          className="button expanded alert"
          href="#"
          onClick={this.clearSearch}
        >
          Clear Search
        </a>
        <a
          className="button expanded success"
          href="#"
          onClick={this.savedListingsBoolean}
        >
          Saved Listings
        </a>

        {this.state.searchedBoolean === true && (
          <div>
            <h2>You have {this.state.results.length} results</h2>
            <Results results={this.state.results} />
          </div>
        )}
        {this.state.savedListingsBoolean === true && (
          <SavedListings savedListings={this.state.savedListings} />
        )}
      </div>
    );
  }
}
