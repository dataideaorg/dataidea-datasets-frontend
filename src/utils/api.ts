import axios from 'axios';
import { Dataset, Category, Course } from '../types';

// Baked in at image build time (see frontend Dockerfile / VITE_API_URL).
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  if (import.meta.env.DEV) {
    return 'http://localhost:8000/api';
  }
  return 'https://datasets.api.dataidea.org/api';
};

const API_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchDatasets = async (): Promise<Dataset[]> => {
  const response = await api.get('/datasets/');
  return response.data;
};

export const fetchDatasetDetails = async (slug: string): Promise<Dataset> => {
  const response = await api.get(`/datasets/${slug}/`);
  return response.data;
};

export const fetchFeaturedDatasets = async (): Promise<Dataset[]> => {
  const response = await api.get('/datasets/featured/');
  return response.data;
};

export const fetchRecentDatasets = async (): Promise<Dataset[]> => {
  const response = await api.get('/datasets/recent/');
  return response.data;
};

export const incrementDownload = async (slug: string): Promise<number> => {
  const response = await api.get(`/datasets/${slug}/download/`);
  return response.data.download_count;
};

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await api.get('/categories/');
  return response.data;
};

export const searchDatasets = async (query: string): Promise<Dataset[]> => {
  const response = await api.get(`/datasets/?search=${query}`);
  return response.data;
};

export const fetchCourses = async (): Promise<Course[]> => {
  const response = await axios.get('https://api.dataidea.org/school/courses');
  return response.data;
};

export default api; 