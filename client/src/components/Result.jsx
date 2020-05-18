var React = require('react');
import ReactHtmlParser from 'react-html-parser';

export default function Result(props) {
  return (
    <div>
      <div className="card">
        <div className="card-divider">
          {props.listing.type} Position {props.listing.title} for{' '}
          {props.listing.company}
        </div>
        <img
          src={props.listing.company_logo}
          width={300}
          height={150}
          mode="fit"
        />
        <div className="card-section">
          <h4>{props.listing.location}</h4>
          <p>{ReactHtmlParser(props.listing.how_to_apply)}</p>
          <p>{ReactHtmlParser(props.listing.description)}</p>
        </div>
      </div>
    </div>
  );
}
