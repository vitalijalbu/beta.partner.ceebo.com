import React from 'react';
import PropTypes from 'prop-types';

const Orders = props => {
  const { color, size, ...otherProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
    >
    <path xmlns="http://www.w3.org/2000/svg" fill="#FFF" d="M1 13h5l1 2h6l1-2h5v6H1z"/>
      <path d="M2 18h16v-4h-3.382l-.723 1.447c-.17.34-.516.553-.895.553H7c-.38 0-.725-.214-.895-.553L5.382 14H2v4zM19 1c.552 0 1 .448 1 1v17c0 .552-.448 1-1 1H1c-.552 0-1-.448-1-1V2c0-.552.448-1 1-1h4c.552 0 1 .448 1 1s-.448 1-1 1H2v9h4c.38 0 .725.214.895.553L7.618 14h4.764l.723-1.447c.17-.34.516-.553.895-.553h4V3h-3c-.552 0-1-.448-1-1s.448-1 1-1h4zM6.293 6.707c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0L9 6.586V1c0-.552.448-1 1-1s1 .448 1 1v5.586l1.293-1.293c.39-.39 1.023-.39 1.414 0s.39 1.023 0 1.414l-3 3c-.195.195-.45.293-.707.293s-.512-.098-.707-.293l-3-3z"/>
    </svg>
  );
};

Orders.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Orders.defaultProps = {
  fill: 'currentColor',
  size: '24',
};

export default Orders;
