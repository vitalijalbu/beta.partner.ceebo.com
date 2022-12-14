import React from 'react';
import PropTypes from 'prop-types';

const StoreStatus = props => {
  const { color, size, ...otherProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
    <path fill="#FFF" d="M19 6a3 3 0 1 1-6 0 3 3 0 1 1-6 0 3 3 0 1 1-6 0V5l2-4h14l2 4v1z"/><path d="M19.895 4.553l-2-4A1.001 1.001 0 0 0 17 0H3c-.379 0-.725.214-.895.553l-2 4A1.002 1.002 0 0 0 0 5v1c0 1.475.81 2.75 2 3.443V12a1 1 0 1 0 2 0v-2a3.99 3.99 0 0 0 3-1.357A3.99 3.99 0 0 0 10 10a3.99 3.99 0 0 0 3-1.357A3.99 3.99 0 0 0 16 10v2a1 1 0 1 0 2 0V9.443C19.19 8.75 20 7.475 20 6V5c0-.155-.036-.309-.105-.447zM16 8c-1.103 0-2-.897-2-2h4c0 1.103-.897 2-2 2zm-6 0c-1.103 0-2-.897-2-2h4c0 1.103-.897 2-2 2zM4 8c-1.103 0-2-.897-2-2h4c0 1.103-.897 2-2 2zm-.382-6h12.764l1 2H2.618l1-2zM19 15h-4a.997.997 0 0 0-.707.293l-2.138 2.138-3.323-4.986a1 1 0 0 0-1.539-.152L4.586 15H1a1 1 0 1 0 0 2h4c.265 0 .52-.105.707-.293l2.138-2.138 3.323 4.986a1 1 0 0 0 1.539.152L15.414 17H19a1 1 0 1 0 0-2"/>
  </svg>
  );
};

StoreStatus.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

StoreStatus.defaultProps = {
  fill: 'currentColor',
  size: '24',
};

export default StoreStatus;
