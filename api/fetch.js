import axios from "axios";

export const handelSignup = async ({ name, email, password }) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/signup`,
      {
        name,
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: error.message };
  }
};

export const handelLogin = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: error.message };
  }
};
