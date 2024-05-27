import axios from 'axios';

// const baseURL = 'https://my-json-server.typicode.com/Danyvi/mock-database'
const baseURL = 'https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router'

const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// perPage: number of events to return per page
// page: page we are on
export default {
  getEvents(perPage, page) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page);
  },
  getEvent(id) {
    return apiClient.get('/events/' + id);
  },
  postEvent(event) {
    return apiClient.post('/events', event);
  },
};