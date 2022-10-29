import React from 'react';
import PropTypes from 'prop-types';

const Bike = props => {
  const { color, size, ...otherProps } = props;
  return (
    <svg width={size} height={size} fill={color} version="1.1" id="bbici" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      viewBox="0 0 20 20">
    <path d="M15.8,17.6c-2.3,0-4.2-1.9-4.2-4.2c0-1.5,0.8-2.8,2-3.5l-0.9-1.3l-3.4,3.9c-0.2,0.2-0.4,0.4-0.7,0.4H8.4
      c0,0.2,0,0.4,0,0.5c0,2.2-2,4.2-4.2,4.2S0,15.6,0,13.3c0-2.2,2-4.1,4.3-4.1c1.4,0,2.8,0.7,3.5,1.9h0.5l0.3-0.3L6.2,6.6H3.8
      c-0.5,0-0.9-0.4-0.9-0.9s0.4-0.9,0.9-0.9h2.9c0.4,0,0.6,0.2,0.8,0.4l2.2,4.1L12,6.8V4.2h-1.7c-0.5,0-0.9-0.4-0.9-0.9
      s0.4-0.9,0.9-0.9h2.6c0.5,0,0.9,0.4,0.9,0.9v3.6l1.6,2.4c0.2,0,0.3,0,0.4,0c2.3,0,4.2,1.9,4.2,4.2S18.1,17.6,15.8,17.6z M15.8,11.1
      c-1.2,0-2.4,0.9-2.4,2.3c0,1.3,1.1,2.4,2.4,2.4s2.4-1,2.4-2.3C18.2,12.2,17.2,11.1,15.8,11.1z M4.3,11c-1.3,0-2.5,1.1-2.5,2.3
      s1.2,2.5,2.5,2.5c1.2,0,2.4-1,2.4-2.4C6.7,12.1,5.6,11,4.3,11z"/>
    </svg>  
    );
};

Bike.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Bike.defaultProps = {
  fill: '#5C5F62',
  size: '24',
};

export default Bike;
