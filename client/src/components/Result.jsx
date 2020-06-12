var React = require('react');
import ReactHtmlParser from 'react-html-parser';

export default function Result(props) {
  return (
    <div>
      <div className="card">
        <div className="card-divider">
          <div className="row">
            {props.listing.type} Position {props.listing.title} for{' '}
            {props.listing.company}
            {/* learn how to get this to align to the left */}
            <i className="fi-save size-48" style={{ textAlign: 'right' }}></i>
          </div>
        </div>
        <img
          src={props.listing.company_logo}
          width={300}
          height={150}
          mode="fit"
        />
        <div className="card-section">
          <h4>{props.listing.location}</h4>
          <span>{ReactHtmlParser(props.listing.how_to_apply)}</span>
          <span>{ReactHtmlParser(props.listing.description)}</span>
        </div>
      </div>
    </div>
  );
}
