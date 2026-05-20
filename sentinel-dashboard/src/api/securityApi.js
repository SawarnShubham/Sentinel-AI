import axios from "axios";

const SENTINEL_API = "http://localhost:5001";

export const getSecurityStats = async (token) => {
  const response = await axios.get(
    `${SENTINEL_API}/api/security/stats`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};