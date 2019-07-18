import React from 'react';
import PropTypes from 'prop-types';
import Status from './Status';
import '../../static/styles/components/issueCard.scss';
const IssueCard = ({ id, title, status, onClick }) => {
   return <div className="issue-card" onClick={() => onClick(id)}>
      <div className="issue-title">{title}</div>
      <Status customClass="issue-status" status={status} />
   </div>;
};

IssueCard.displayName = 'IssueCard';
const { string, func } = PropTypes;
IssueCard.defaultProps = {
   title: 'title',
   status: 'OPEN',
   onClick: () => {}
};
IssueCard.propTypes = {
   id: string,
   title: string,
   status: Status.propTypes,
   onClick: func
};
export default React.memo(IssueCard);