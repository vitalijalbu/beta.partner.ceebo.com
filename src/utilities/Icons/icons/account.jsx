import React from 'react';
import PropTypes from 'prop-types';

const Account = props => {
  const { color, size, ...otherProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...otherProps}
    >
		<path className="no-stroke" d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.487 10-10c0-5.514-4.486-10-10-10zm5.603 15.7C14.2 14.84 12.257 14 10 14c-2.256 0-4.2.842-5.604 1.7C2.92 14.248 2 12.23 2 10c0-4.41 3.59-8 8-8s8 3.59 8 8c0 2.23-.92 4.248-2.397 5.7zM6.15 17.01C7.217 16.456 8.536 16 10 16s2.782.457 3.85 1.008c-1.143.63-2.455.992-3.85.992s-2.708-.362-3.85-.99zM10 10c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2zm0-6C7.794 4 6 5.794 6 8s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z"/>
  </svg>
  );
};

Account.propTypes = {
  color: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Account.defaultProps = {
  color: 'currentColor',
  size: '24',
};

export default Account;
