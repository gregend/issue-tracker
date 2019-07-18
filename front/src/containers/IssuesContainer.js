import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAllIssues } from '../api/issues';

const useOnMount = (setIssues) => {
   useEffect(() => {
      (async () => {
         const issues = await getAllIssues();
         setIssues(issues)
      })
   }, []);
}

const IssuesContainer = ({ }) => {
   const [issues, setIssues]  = useState([]);
   
};