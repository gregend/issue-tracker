import axios from 'axios';
const fetchFromApi = async ({
   apiEndpoint,
   method,
   data
}) => {
   const response = await axios({
      method,
      url: apiEndpoint,
      data
   });
   return response.data;
}
export default fetchFromApi;