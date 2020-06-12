import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Row, Col } from 'reactstrap';
import axios from 'axios';

export default class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: this.props.listing.type,
      title: this.props.listing.title,
      company: this.props.listing.company,
      company_logo: this.props.listing.company_logo,
      location: this.props.listing.location,
      how_to_apply: this.props.listing.how_to_apply,
      description: this.props.listing.description,
    };
    this.saveFunction = this.saveFunction.bind(this);
  }

  saveFunction() {
    let saveListing = {
      type: this.state.type,
      title: this.state.title,
      company: this.state.company,
      company_logo: this.state.company_logo,
      location: this.state.location,
      how_to_apply: this.state.how_to_apply,
      description: this.state.description,
    };
    axios
      .post('/saveListing/api', { data: saveListing })
      .then((response) => {
        console.log(response.data, 'will be saved to the database');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="card">
        <div>
          <Row>
            <Col>
              <div className="card-divider">
                {this.props.listing.type} Position {this.props.listing.title}{' '}
                for {this.props.listing.company}
              </div>
            </Col>
            <Col>
              <div className="card-divider">
                <button
                  type="button"
                  className="success button"
                  onClick={this.saveFunction}
                >
                  Save
                </button>
              </div>
            </Col>
          </Row>
        </div>
        <div>
          <img
            src={this.props.listing.company_logo}
            width={300}
            height={150}
            mode="fit"
          />
          <div className="card-section">
            <h4>{this.props.listing.location}</h4>
            <span>{ReactHtmlParser(this.props.listing.how_to_apply)}</span>
            <span>{ReactHtmlParser(this.props.listing.description)}</span>
          </div>
        </div>
      </div>
    );
  }
}
