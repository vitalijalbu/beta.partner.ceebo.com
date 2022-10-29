import React from 'react';
import PropTypes from 'prop-types';

const CartMajor = props => {
  const { color, size, ...otherProps } = props;
  return (
    <svg width={size} height={size} fill={color} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M1 1c0-.552.45-1 1.004-1h1.505c.831 0 1.505.672 1.505 1.5v.56l12.574.908c.877.055 1.52.843 1.397 1.71l-.866 6.034A1.504 1.504 0 0116.63 12H5.014v2h10.043a3.005 3.005 0 013.011 3c0 1.657-1.348 3-3.01 3a3.005 3.005 0 01-2.84-4H6.85a3.005 3.005 0 01-2.84 4A3.005 3.005 0 011 17c0-1.306.838-2.418 2.007-2.83V3.01 2H2.004A1.002 1.002 0 011 1zm4.014 3.064V10h11.18l.727-5.07-11.907-.866zM14.054 17c0-.552.449-1 1.003-1 .554 0 1.004.448 1.004 1s-.45 1-1.004 1a1.002 1.002 0 01-1.003-1zM3.007 17c0-.552.45-1 1.004-1s1.003.448 1.003 1-.449 1-1.003 1a1.002 1.002 0 01-1.004-1z"/></svg>
  );
};

CartMajor.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

CartMajor.defaultProps = {
  fill: '#5C5F62',
  size: '24',
};

export default CartMajor;
