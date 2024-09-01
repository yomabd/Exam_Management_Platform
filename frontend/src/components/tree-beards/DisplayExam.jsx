import React from 'react'
import { transformData} from './transformData';
import TreeStructure from './TreeStructure';
import { IoArrowBackCircle } from "react-icons/io5";
import { BackButton } from '../dashboard/FormComponents';



const DisplayExam = ({questionBank, setShowDisplayExam}) => {    


  return (  
  
  
      <div className=''>
        
                <BackButton
                onClick = {()=>{setShowDisplayExam(false)}}
                >
                <IoArrowBackCircle 
                    size={30}
                    className="text-white"/> Back
                </BackButton>
        <TreeStructure data={transformData(questionBank)} />
      </div>
  

  )
}

export default DisplayExam;