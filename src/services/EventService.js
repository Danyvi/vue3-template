import axios from 'axios';

const baseURL = 'https://my-json-server.typicode.com/Danyvi/mock-database'

const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  getEvents() {
    return apiClient.get('/events');
  },
  getEvent(id) {
    return apiClient.get('/events/' + id);
  },
  postEvent(event) {
    return apiClient.post('/events', event);
  },
};