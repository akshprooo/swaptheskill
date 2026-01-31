const baseUrl = 'http://localhost:5000/api';

const endpoints = {
  getUsers: `${baseUrl}/users`,
  getUserById: (id) => `${baseUrl}/users/${id}`,
  createUser: `${baseUrl}/users`,
  updateUser: (id) => `${baseUrl}/users/${id}`,
  deleteUser: (id) => `${baseUrl}/users/${id}`,
  getRecommendations: `${baseUrl}/recommendations`,
  getProfile: `${baseUrl}/auth/profile`,
  getSkills: `${baseUrl}/utils/skills`,
  register: `${baseUrl}/auth/register`,
  login: `${baseUrl}/auth/login`
};

export default endpoints;