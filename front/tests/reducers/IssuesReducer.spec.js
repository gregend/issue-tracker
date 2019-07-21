/* global jest it describe */
import IssuesReducer from '../../src/reducers/IssuesReducer';
const { reducer, initialState } = IssuesReducer;

describe('Reducers: IssuesReducer', () => {
    it('Should handle FETCH_ISSUES', () => {
        const expectedState = {
            ...initialState,
            status: 'PENDING'
        };
        expect(reducer(initialState, { type: 'FETCH_ISSUES' }))
            .toEqual(expectedState)
    });

    it('Should handle FETCH_ISSUES_SUCCESS', () => {
        const expectedState = {
            status: 'SUCCESS',
            detail: {},
            issues: {
                issueId: {
                    id: 'issueId',
                    title: 'issueTitle',
                    status: 'PENDING'
                }
            }
        };
        const actionMock = {
            type: 'FETCH_ISSUES_SUCCESS',
            payload: {
                issues: {
                    issueId: {
                        id: 'issueId',
                        title: 'issueTitle',
                        status: 'PENDING'
                    }
                }
            }
        }
        expect(reducer(initialState, actionMock))
            .toEqual(expectedState)
    });

    it('Should handle UPDATE_ISSUE', () => {
        const expectedState = {
            status: 'SUCCESS',
            detail: {},
            issues: {
                issueId: {
                    id: 'issueId',
                    title: 'newIssueTitle',
                    status: 'PENDING'
                }
            }
        };
        const actionMock = {
            type: 'UPDATE_ISSUE',
            payload: {
                id: 'issueId',
                data: {
                    id: 'issueId',
                    title: 'newIssueTitle',
                    status: 'PENDING'
                }
            }
        };
        expect(reducer(initialState, actionMock))
            .toEqual(expectedState)
    });
});
