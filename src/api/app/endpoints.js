import apiClient from '../index';
import { backendUrl } from '../index';

export const getSearchResults = async (params, limit) => {
  try {
      const response = await apiClient.get('api/search/',  { params: { ...params, limit } } );
      return {
        searchResults: response.data,
        totalResults: parseInt(response.headers['x-total-count'])
      }
  } catch (error) {
      throw error;
  }
};

export const getAppDetails = async (appId) => {
  try {
    const response = await apiClient.get(`/api/details/${appId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching app details:', error);
    throw error;
  }
};

export const getVersionDetails = async (appId) => {
  try {
    const response = await apiClient.get(`/api/version-details/${appId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching app versions:', error);
    throw error;
  }
};

export const getCategories = async () => {
    try {
      const response = await apiClient.get('/api/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
};

export const getMaturityLevels = async () => {
  try {
    const response = await apiClient.get('/api/maturity');
    return response.data;
  } catch (error) {
    console.error('Error fetching maturity:', error);
    throw error;
  }
};

export const getPermissions = async () => {
  try {
    const response = await apiClient.get('/api/permissions');
    return response.data;
  } catch (error) {
    console.error('Error fetching permissions:', error);
    throw error;
  }
};

export const generateDownloadURL = async(hash) => {
  const response = await apiClient.get(`/api/generate-download-url/${hash}`)

  return backendUrl + response.data.url;
}