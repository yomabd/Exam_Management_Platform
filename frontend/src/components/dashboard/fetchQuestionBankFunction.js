import api from '../../configs/axiosConfig';
import { toast } from "react-toastify";

// Define fetch function to fetch question banks
export const fetchQuestionBanks = async (url, setLoading, setQuestionBanks) => {
  try {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authorization required, please login");
      setLoading(false);
      return;
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await api.get(url, { headers });
    // console.log(response);
    if (response.status !== 200) {
      throw new Error(`Http error status: ${response.status}`);
    }
    const data = response.data;
    // console.log(data);
    setQuestionBanks(data);
  } catch (error) {
    console.log("Error fetching data...", error);
    toast.error("Error fetching data: " + error.message);
  } finally {
    setLoading(false);
  }
};
