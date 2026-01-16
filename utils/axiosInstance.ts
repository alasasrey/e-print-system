import axios from 'axios';
import { apiUrl } from './apiUrl'; // or wherever you put the code from Step 1

const axiosInstance = axios.create({
    baseURL: apiUrl,
    // Other axios configurations...
});

export default axiosInstance;
