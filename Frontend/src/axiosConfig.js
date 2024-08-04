import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://quizapp-68lr.onrender.com',
});

export default instance;
