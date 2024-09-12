import apiClient from '../index';

export const login = async (email, password) => {
    try {
      const response = await apiClient.post('/api/login', {
        email,
        password
      });
      return response.data;  // Return the data (like access_token)
    } catch (error) {
      throw error;  // Propagate the error for the caller to handle
    }
  };

export const register = async (email, first_name, last_name, password) => {
    try{
        await apiClient.post('/api/register', {
            email,
            first_name,
            last_name,
            password
        });
    } catch (error) {
        throw error
    }
}