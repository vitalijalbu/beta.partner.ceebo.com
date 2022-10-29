import React from 'react';
import PropTypes from 'prop-types';

const Store = (props) => {
  const { color, size, ...otherProps } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path
        className="no-stroke"
        d="M16 8c-1.103 0-2-.897-2-2h4c0 1.103-.897 2-2 2zm0 6H4v-4c1.193 0 2.267-.525 3-1.357C7.733 9.475 8.807 10 10 10s2.267-.525 3-1.357c.733.832 1.807 1.357 3 1.357v4zm-3.28 4H7.28c.358-.702.537-1.434.628-2h4.184c.09.566.27 1.298.627 2zM12 6c0 1.103-.897 2-2 2s-2-.897-2-2h4zM2 6h4c0 1.103-.897 2-2 2s-2-.897-2-2zm1.618-4h12.764l1 2H2.618l1-2zm16.277 2.553l-2-4C17.725.213 17.38 0 17 0H3c-.38 0-.725.214-.895.553l-2 4C.035 4.69 0 4.845 0 5v1c0 1.474.81 2.75 2 3.444V15c0 .552.447 1 1 1h2.87c-.156.747-.507 1.7-1.317 2.105-.415.208-.633.673-.527 1.125.108.45.51.77.974.77h10c.464 0 .866-.32.974-.77.106-.452-.112-.917-.527-1.125-.8-.4-1.153-1.356-1.313-2.105H17c.553 0 1-.448 1-1V9.444c1.19-.694 2-1.97 2-3.444V5c0-.155-.036-.31-.105-.447z"
      />
      '
    </svg>
  );
};

Store.propTypes = {
  fill: PropTypes.string,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Store.defaultProps = {
  fill: 'currentColor',
  size: '24',
};

export default Store;
