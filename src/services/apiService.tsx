import axios from "axios";

export const AuthPost = async (path: string, data: any): Promise<any> => {
  try {
    const userData = localStorage.getItem("user") || "";
    const parsedUserData = JSON.parse(userData);
    const token = parsedUserData.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res = await axios.post(path, data, { headers });
    return res;
  } catch (error: any) {
    return error.response;
  }
};
