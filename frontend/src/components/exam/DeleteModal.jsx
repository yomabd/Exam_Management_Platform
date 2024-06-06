import React from 'react'

const DeleteModal = () => {
  return (
    <div>
        
        import React from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DeleteModal = ({closeDelete,id}) => {

    const handleDelete = () => {
      axios
        .delete(`http://localhost:3001/api/book/${id}`)
        .then((response) => {
          closeDelete();
          toast.success("Book deleted successfully!");
          setTimeout(()=>{

            window.location.reload();
          },2000)
         
        })
        .catch((error) => {
          toast.error(`Error: ${error.message}`);
          closeDelete()
          window.location.reload();

        });
    };
  
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-60  flex justify-center items-center z-50 overlay'
    onClick={closeDelete}
    >
          <div className="flex flex-col items-center justify-center p-6 border-2 bg-sky-200 rounded-md border-none relative modal"
          onClick={(e)=>e.stopPropagation()}
          >
          <h1 className=''>ARE YOU SURE YOU WANNA DELETE THIS BOOK?</h1>
          <div className='flex justify-center items-center'>

          <button
            onClick={closeDelete}
            className="bg-sky-00 rounded-md p-2 px-4 m-8 cancel"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 rounded-md p-2 px-4 hover:bg-red-800 m-8"
          >
            Delete
          </button>
          </div>

        </div>
        <ToastContainer />

        </div>
        

  );
}

export default DeleteModal;
    </div>
  )
}

export default DeleteModal