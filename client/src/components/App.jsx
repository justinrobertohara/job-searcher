import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: undefined,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    alert('fetch call to github api ', +this.state.searchTerm);
    console.log(this.state.searchTerm);
    event.preventDefault();
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
          onClick={(e) => {
            this.handleSubmit(e.target.value);
          }}
        >
          Search Github
        </a>
      </div>
    );
  }
}
