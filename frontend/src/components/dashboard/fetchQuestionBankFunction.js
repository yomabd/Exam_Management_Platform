// define fetch function to fetch question banks
export const fetchQuestionBanks = async (url, setLoading, setQuestionBanks) => {
  try {
    setLoading(true);
    const response = await fetch(url);
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
