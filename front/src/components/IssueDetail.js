import React, { useReducer, useEffect } from 'react';

const SupaInput = ({ value, onChange, customClasses, placeholder }) => {
    return <input
        type="text"
        placeholder={placeholder}
        onChange={event => onChange(event.target.value)}
        className={`supa-input ${customClasses}`}
        value={value} />;
};

const SupaTextarea = ({ value, onChange, customClasses, placeholder }) => {
    return <textarea
        placeholder={placeholder}
        onChange={event => onChange(event.target.value)}
        className={`supa-textarea ${customClasses}`}
        value={value} />;
};
const StatusPicker = ({ options, status, onChange }) => {
    return <select
        value={status}
        onChange={event => onChange(event.target.value)}>
        {options.map(option => {
            return <option
                key={option}
                value={option}>{option}</option>
        })}
    </select>;
};
const IssueDetailReducer = (state, action) => {
    const wtf = (() => {
        switch (action.type) {
            case 'INIT': {
                return action.payload;
            }
            case 'SET_TITLE': {
                return Object.assign(state, { title: action.payload })
            }
            case 'SET_DESCRIPTION': {
                return Object.assign(state, { description: action.payload })
            }
            case 'SET_STATUS': {
                return Object.assign(state, { status: action.payload })
            }
            default:
                return state;
        }
    })();
    return { ...wtf }
}

const IssueDetail = ({ issue, onDetailUpdate }) => {
    const [issueDetailState, dispatch] = useReducer(IssueDetailReducer, {});
    useEffect(() => {
        dispatch({ type: 'INIT', payload: issue });
    }, [issue.id])
    const { id, title, description, status } = issueDetailState;
    return <div className="issue-detail">
        <SupaInput
            customClasses="issue-title"
            value={title}
            placeholder={'Title'}
            onChange={value => dispatch({ type: 'SET_TITLE', payload: value })} />
        <SupaTextarea
            customClasses="issue-description"
            value={description}
            placeholder={'Description'}
            onChange={value => dispatch({ type: 'SET_DESCRIPTION', payload: value })} />
        <div className="issue-status">
            <StatusPicker
                onChange={value => dispatch({ type: 'SET_STATUS', payload: value })}
                options={['OPEN', 'PENDING', 'CLOSED']}
                status={status} />
        </div>
        <div className="issue-update" onClick={() => onDetailUpdate({ id, title, description, status })}>
            UPDATE
       </div>
    </div>;
};

IssueDetail.defaultProps = {
    issue: {
        title: 'Title',
        description: 'Description',
        status: 'OPEN'
    }
};
export default IssueDetail;