import React from 'react';
import PropTypes from 'prop-types';
const statuses = ['OPEN', 'PENDING', 'DONE'];

const Status = ({ status, customClass }) => {
   const className = `status-${status.toLowerCase()} ${customClass}`;
   return <div className={className}>{status}</div>
};

Status.displayName = 'Status';
const { oneOf } = PropTypes;
Status.propTypes = {
   status: oneOf(statuses)
};

export default Status;