var React = require('react');

export default function Result(props) {
  return (
    <div>
      <div className="card">
        <div className="card-divider">{props.listing.title}</div>
        <img src={props.listing.company_logo} />
        <div className="card-section">
          <h4>{props.listing.location}</h4>
          <p>{props.listing.description}</p>
        </div>
      </div>
    </div>
  );
}
