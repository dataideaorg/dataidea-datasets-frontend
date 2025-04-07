import axios from 'axios';
import { Dataset, Category } from '../types';

const API_URL = 'http://localhost:8000/api';

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

export default api; 