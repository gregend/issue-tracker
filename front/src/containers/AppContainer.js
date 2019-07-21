import React, { useEffect, useReducer } from 'react';
import { getAllIssues, createIssue, updateIssue } from '../api/issues';
import '../../static/styles/components/issuesContainer.scss';
import IssuesContainer from './IssuesContainer';
import IssuesReducer, { ActionTypes } from '../reducers/IssuesReducer';
import IssueDetail from '../components/IssueDetail';

const useOnMount = (dispatch) => {
   useEffect(() => {
      (async () => {
         dispatch({ type: ActionTypes.FETCH_ISSUES });
         const issues = await getAllIssues();
         dispatch({ type: ActionTypes.FETCH_ISSUES_SUCCESS, payload: { issues } });
      })()
   }, []);
};

const onIssueUpdate = dispatch => async (issueData) => {
   const { id, data } = await updateIssue(issueData);
   dispatch({ type: ActionTypes.UPDATE_ISSUE, payload: { id, data } });
};

const AppContainer = () => {
   const [state, dispatch] = useReducer(IssuesReducer.reducer, IssuesReducer.initialState);

   const onIssueClick = dispatch => id => {
      dispatch({ type: ActionTypes.SET_DETAIL, payload: { id }});
   };
   const onCreateNewClick = dispatch => async ({ title, description }) => {
      const { id, data } = await createIssue(title, description);
      dispatch({ type: ActionTypes.CREATE_ISSUE, payload: { id, data } });
   };
   useOnMount(dispatch);
   return <div className="app-container">
      <div className="nav-bar">
         <div className="button" onClick={onCreateNewClick(dispatch)}>Add new</div>
      </div>
      <div className="issues">
         <IssuesContainer
            issues={state.issues}
            onIssueClick={onIssueClick(dispatch)} />
         <IssueDetail issue={state.detail} onDetailUpdate={onIssueUpdate(dispatch)} />
      </div>
   </div>;
};
AppContainer.displayName = 'AppContainer';
export default AppContainer;