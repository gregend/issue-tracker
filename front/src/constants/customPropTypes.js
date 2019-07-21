import PropTypes from 'prop-types';
import { stringify } from 'querystring';
const { oneOf, string } = PropTypes;

export const IssueStatusesPropTypes = oneOf(['OPEN', 'PENDING', 'CLOSED']);
export const IssuePropType = {
    id: string,
    title: string,
    status: IssueStatusesPropTypes
};
