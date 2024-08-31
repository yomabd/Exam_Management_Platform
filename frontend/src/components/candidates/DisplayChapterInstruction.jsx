import React from 'react'
import { Button } from '../dashboard/FormComponents'

const DisplayChapterInstruction = ({heading,paragraphs,handleProceed}) => {
  return (
    <div>
        <div className='gap-y-4 pt-6'>
                    <h1 className='text-xl mb-4 font-semibold uppercase'>{heading}</h1>
                    {paragraphs.map((paragraph, index) => (
                      <p className='mt-4' key={index}>{paragraph}</p>
                    ))}
                    <div className='flex justify-between items-center absolute bottom-10 right-10'>
                      <Button className="text-white bg-blue-500 py-2 px-4 rounded w-24" onClick={handleProceed}>
                        Proceed
                      </Button>
                    </div>
                  </div>
    </div>
  )
}

export default DisplayChapterInstruction