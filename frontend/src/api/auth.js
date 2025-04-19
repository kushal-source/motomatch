import axios from 'axios';

const API_URL = 'http://localhost:5000'; 

// Signup function
export const signupUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      name,
      email,
      password
    });
    return response.data;
  } catch (error) {
    console.error("There was an error signing up!", error);
    throw error;
  }
};
