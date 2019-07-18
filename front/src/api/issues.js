import fetchFromApi from '../helpers/fetchFromApi';

export function getIssue(id) {
   return fetchFromApi({
      apiEndpoint: `/api/issues/${id}`,
      method: 'get'
   });
}

export function deleteIssue(id) {
   return fetchFromApi({
      apiEndpoint: `/api/issues/${id}`,
      method: 'delete'
   });
}

export function getAllIssues() {
   return fetchFromApi({
      apiEndpoint: `/api/issues`,
      method: 'get'
   });
}

export function createIssue(title, description) {
   return fetchFromApi({
      apiEndpoint: `/api/issues`,
      method: 'post',
      data: {
         title,
         description
      }
   });
}

export function updateIssue({ id, title, description, status }) {
   return fetchFromApi({
      apiEndpoint: `/api/issues/${id}`,
      method: 'post',
      data: {
         title,
         description,
         status
      }
   });
}