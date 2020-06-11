import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const App = ({ title }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <h1>{title}</h1>
  );
};

App.propTypes = {
  title: PropTypes.string,
};

App.defaultProps = {
  title: '',
};

ReactDOM.render(
  <App title="React Project" />,
  document.getElementById('app'),
);

module.hot.accept();
