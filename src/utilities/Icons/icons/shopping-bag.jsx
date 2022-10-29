import React from 'react';
import PropTypes from 'prop-types';

const ShoppingBag = props => {
  const { color, size, ...otherProps } = props;
  return (
    <svg width={size} height={size} fill={color} version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20 20">
    <path d="M17.4,5.5c0-0.3-0.3-0.6-0.6-0.8c-0.3-0.1-0.7-0.1-1,0.2l-0.7,0.7c-0.2-0.2-0.6-0.6-0.7-0.7V4.3
      c0-3.6-2.9-4.5-4.5-4.5c-1.6,0-4.5,0.9-4.5,4.5v0.6C5.3,5.1,5,5.4,4.8,5.6L4.1,4.9c-0.2-0.2-0.6-0.3-1-0.2C2.8,4.9,2.6,5.1,2.6,5.5
      L0.9,19.2c0,0.3,0,0.5,0.2,0.7c0.2,0.2,0.4,0.3,0.7,0.3h16.4c0.3,0,0.5-0.1,0.7-0.3c0.2-0.2,0.3-0.5,0.2-0.7L17.4,5.5z M10,1.6
      c0.3,0,2.7,0.1,2.7,2.7v1.3l-0.1,0.1l-0.7-0.7c-0.4-0.4-0.9-0.4-1.3,0L10,5.6L9.3,4.9C9.1,4.7,8.9,4.7,8.7,4.7
      c-0.2,0-0.5,0.1-0.6,0.3L7.4,5.6L7.3,5.5V4.3C7.3,1.6,9.7,1.6,10,1.6z M8,7.5l0.7-0.7l0.7,0.7c0.4,0.4,0.9,0.4,1.3,0l0.7-0.7L12,7.5
      c0.3,0.3,0.9,0.3,1.3,0l0.7-0.7l0.7,0.7c0.3,0.3,0.9,0.3,1.3,0l1.3,10.9H2.9L4.1,7.5c0.4,0.4,0.9,0.4,1.3,0l0.7-0.7l0.7,0.7
      C7.1,7.9,7.7,7.9,8,7.5z"/>
    </svg>
  );
};

ShoppingBag.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ShoppingBag.defaultProps = {
  color: '#5C5F62',
  size: '24',
};

export default ShoppingBag;
