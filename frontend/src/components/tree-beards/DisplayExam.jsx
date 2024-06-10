import React from 'react'
// import axios from 'axios';
// import Spinner from '../Spinner';
import { transformData} from './transformData';
import TreeStructure from './TreeStructure';


const DisplayExam = ({questionBank}) => {    

// const [questionBank, setQuestionBank] = useState(null);

// const fetchQuestionBank = async (id) => {
//   try {
//     const response = await axios.get(`http://localhost:3005/api/questionBanks/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching question bank:", error);
//     throw error;
//   }
// };

// useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchQuestionBank(qid);
//         setQuestionBank(transformData(data));
//       } catch (error) {
//         console.error("Error fetching question bank:", error);
//       }
//     };
//     fetchData();
//   }, []);
console.log(questionBank)
console.log('form prop')

  return (
  
  
  
      <div>
        <TreeStructure data={transformData(questionBank)} />
      </div>
  

  )
}

export default DisplayExam;