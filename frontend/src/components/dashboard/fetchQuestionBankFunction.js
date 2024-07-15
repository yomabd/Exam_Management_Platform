import axios from "axios";
// define fetch function to fetch question banks
export const fetchQuestionBanks = async (url, setLoading, setQuestionBanks) => {
  try {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authorization required, please login");
      return;
    }
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(url, { headers });
    if (!response.ok) {
      throw new Error(`Http error status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    setQuestionBanks(data);
  } catch (error) {
    console.log("Error fetching data...", error);
  } finally {
    setLoading(false);
  }
};
