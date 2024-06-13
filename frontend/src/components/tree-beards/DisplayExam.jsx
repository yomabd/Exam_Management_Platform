import React from 'react'
import { transformData} from './transformData';
import TreeStructure from './TreeStructure';
import { Button } from '../dashboard/FormComponents';
import { IoArrowBackCircle } from "react-icons/io5";



const DisplayExam = ({questionBank, setShowDisplayExam}) => {    


  return (  
  
  
      <div className=''>
        <Button 
                onClick = {()=>{setShowDisplayExam(false)}}
                className="w-32 flex text-white space-x-2 mb-6 bg-gray-700 hover:bg-gray-800">
                    <IoArrowBackCircle 
                    size={30}
                    className="text-white"/> Back
                </Button>
        <TreeStructure data={transformData(questionBank)} />
      </div>
  

  )
}

export default DisplayExam;