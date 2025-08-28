const React = require('react');

const ReactMarkdown = ({ children, ...props }) => {
  return React.createElement('div', props, children);
};

module.exports = ReactMarkdown;
