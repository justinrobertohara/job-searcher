import React from 'react';
import Result from './Result.jsx';

export default function Results(props) {
  return props.results.map((listing, key) => {
    return <Result key={key} listing={listing} />;
  });
}
