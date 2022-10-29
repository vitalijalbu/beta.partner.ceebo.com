import React from 'react';
import PropTypes from 'prop-types';

const Customers = props => {
  const { color, size, ...otherProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
    <path xmlns="http://www.w3.org/2000/svg" d="M10 13c-4 0-7 3-7 3l1 3h12l1-3s-3-3-7-3" fill="#FFF"/>
		<path d="M17.707 15.293c.268.268.36.664.24 1.023l-1 3c-.135.41-.517.684-.947.684H4c-.43 0-.813-.275-.95-.684l-1-3c-.12-.36-.025-.755.243-1.023C2.427 15.158 5.635 12 10 12s7.572 3.158 7.707 3.293zM15.28 18l.56-1.687C14.92 15.56 12.687 14 10 14c-2.703 0-4.927 1.558-5.843 2.31L4.72 18h10.56zM10 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0 8c2.757 0 5-2.243 5-5s-2.243-5-5-5-5 2.243-5 5 2.243 5 5 5z"/>    </svg>
  );
};

Customers.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Customers.defaultProps = {
  fill: 'currentColor',
  size: '24',
};

export default Customers;
