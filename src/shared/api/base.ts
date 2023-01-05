import axios from 'axios';
import { API_BASE } from '../config';

export const apiInstance = axios.create({
	baseURL: API_BASE,
});
