import React from 'react';
import Result from './Result.jsx';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let listings = this.props.results;
    return (
      <div>
        {listings.map((listing, key) => {
          return <Result key={key} listing={listing} />;
        })}
      </div>
    );
  }
}
