import React from 'react';
import PropTypes from 'prop-types';
import { IssueStatusesPropTypes } from '../constants/customPropTypes';

const Status = ({ status, customClass }) => {
   const className = `status-${status.toLowerCase()} ${customClass}`;
   return <div className={className}>{status}</div>
};

Status.displayName = 'Status';
const { string } = PropTypes;
Status.propTypes = {
   status: IssueStatusesPropTypes,
   customClass: string
};

export default Status;