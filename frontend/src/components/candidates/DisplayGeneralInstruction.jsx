import React from 'react'

const DisplayGeneralInstruction = ({heading,paragraphs,handleAgree,handleProceed, agree}) => {
  return (
    <div>
      <div className='gap-y-4 pt-6'>
                    <h1 className='text-xl mb-4 font-semibold uppercase'>{heading}</h1>
                    <div>
                    {paragraphs.map((paragraph, index) => (
                      <p className='mt-4' key={index}>{paragraph}</p>
                    ))}
                    </div>
                    <div className='flex justify-between items-center absolute bottom-10 right-10 left-10'>
                      <div className='space-x-2 flex'>
                        <input type="checkbox" name="agreement" id="agree" onChange={handleAgree} checked={agree} />
                        <label htmlFor="agree" className='text-xs italic font-light'>Check to agree</label>
                      </div>
                      <button className="text-white bg-purple-600 hover:bg-purple-500 py-2 px-4 rounded" onClick={handleProceed}>
                        Proceed
                      </button>
                    </div>
                  </div>
    </div>
  )
}

export default DisplayGeneralInstruction