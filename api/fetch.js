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

export const handelSaveForm = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/save-form`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: error.message };
  }
};
export const handelGetForms = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/forms`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: error.message };
  }
};
export const handelGetFormsByEmail = async (email) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/forms/${email}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: error.message };
  }
};
export const handelGetFormsById = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/form/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: error.message };
  }
};
export const handelDeleteForm = async (id) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/delete-form/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: error.message };
  }
};
export const handelSubmitForm = async (formData) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/response`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: error.message };
  }
};
export const handelGetResponse = async (email) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/responses-by-owner/${email}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: error.message };
  }
};
export const handelUpdateForm = async (id, formData) => {
  try {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/update-form/${id}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: error.message };
  }
};
