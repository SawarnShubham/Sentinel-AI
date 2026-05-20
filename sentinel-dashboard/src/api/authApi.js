import axios from "axios";

const TARGET_API = "http://localhost:5000";

export const loginAdmin = async (email, password) => {
  const response = await axios.post(
    `${TARGET_API}/api/auth/login`,
    {
      email,
      password,
    }
  );

  return response.data;
};