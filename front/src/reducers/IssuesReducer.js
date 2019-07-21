const initialState = {
    status: 'NOT_PENDING',
    issues: {},
    detail: {}
};


export const ActionTypes = {
    SET_DETAIL: 'SET_DETAIL',
    CREATE_ISSUE: 'CREATE_ISSUE',
    UPDATE_ISSUE: 'UPDATE_ISSUE',
    FETCH_ISSUES: 'FETCH_ISSUES',
    FETCH_ISSUES_SUCCESS: 'FETCH_ISSUES_SUCCESS'
};

export const reducer = (state = initialState, action) => {
    const xd = (()=> {
    switch (action.type) {
        case ActionTypes.CREATE_ISSUE:
        case ActionTypes.UPDATE_ISSUE: {
            const { issues } = state;
            const { id, data } = action.payload;
            return Object.assign(state, {
                issues: { ...issues, [id]: data }
            });
        }
        case ActionTypes.FETCH_ISSUES: {
            return Object.assign(state, {
                status: 'PENDING'
            });
        }
        case ActionTypes.FETCH_ISSUES_SUCCESS: {
            return Object.assign(state, {
                status: 'SUCCESS',
                issues: action.payload.issues
            });
        }
        case ActionTypes.SET_DETAIL: {
            return Object.assign(state, {
                detail: state.issues[action.payload.id]
            })
        }
        default: {
            return state;
        }
    }})();
    return { ...xd };
};

export default {
    reducer,
    initialState,
    ActionTypes
}
