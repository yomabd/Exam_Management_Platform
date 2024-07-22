// Assuming you're using React
import React, { useState, useEffect } from 'react';

const fetchCandidates = async (token) => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await fetch("/api/candidates", {headers});

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching candidates: ", error);
    throw error;
  }
};

const CandidatesList = () => {
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getCandidates = async () => {
      try {
        const data = await fetchCandidates(token);
        setCandidates(data);
      } catch (error) {
        setError(error.message);
      }
    };

    getCandidates();
  }, [token]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Candidate List</h1>
      <ul>
        {candidates.map(candidate => (
          <li key={candidate._id}>{candidate.firstname} {candidate.lastname} - {candidate.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default CandidatesList;
