import React, {useEffect} from 'react'
import {FaXmark} from "react-icons/fa6"
import { useGlobalContext } from '../context'
import {Link, useNavigate} from "react-router-dom"

function Details() {
  const navigate = useNavigate()
  const {
    selectedCard,
    editMode,
    closeDetails,
    deletePost,
    handleInp,
    handleEditSave,
  } = useGlobalContext();

  useEffect(() => {
    if (!selectedCard) {
      // Navigate to home or show a message
      setTimeout(()=> {
        navigate('/')
      }, 1500)
    }
  }, [selectedCard]);

  if (!selectedCard) {
    return <div>No details available.</div>;
  }
  return (
    <div>
        <div className="fixed inset-0 bg-image bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className='absolute top-4 left-4 flex space-x-7'>
            <Link to={"/"} className="no-underline">
              <button onClick={closeDetails} className='bg-red-500 py-2 px-4 rounded text-white text-2xl font-bold hover:bg-red-600 transition duration-300'><FaXmark/></button>
            </Link>
            <button onClick={handleEditSave} className='bg-red-500 text-white py-2 px-4 rounded text-xl font-semibold hover:bg-red-600 transition duration-300'>
              {editMode ? "Save Account" : "Edit Account"}
            </button>
            <Link to={"/"} className="no-underline">
              <button onClick={deletePost} className='bg-red-500 text-white py-2 px-4 text-xl rounded font-semibold hover:bg-red-600 transition duration-300'>Delete Account</button>
            </Link>
          </div>
          <div className="bg-white h-auto rounded-lg shadow-lg w-full max-w-5xl p-4 relative">
            <div className="flex flex-col items-center">
              <div className="w-full h-[50vh] flex flex-col shadow-lg items-center rounded-lg overflow-hidden">
                <img src={selectedCard.image} alt={selectedCard.accountTitle} className="h-[100%] w-full img object-cover rounded-lg mb-4" />
              </div>
              <div className="h-auto w-full flex flex-col items-center">
                <div className='h-[85px] w-full flex flex-col items-center justify-around'>
                  <h2 className="text-3xl font-bold">
                    <input className="bg-transparent h-12 text-center w-[350px] outline-none border-none" name="accountTitle" onChange={handleInp} type={editMode ? "text" : "button"} value={selectedCard.accountTitle} readOnly={!editMode} />
                  </h2>
                  <div className='flex items-center justify-center gap-x-1'>
                    <h3 className="text-2xl">RS: </h3>
                    <input className="text-xl font-semibold text-left w-[100px] px-1 outline-none border-none" name="accountNumber" onChange={handleInp} type={editMode ? "text" : "button"} value={selectedCard.accountNumber} readOnly={!editMode} />
                  </div>
                </div>
                <div className='h-[80px] w-full flex items-center justify-around'>
                  <div className='px-16 py-1.5  rounded-lg flex flex-col items-center justify-center gap-x-4 bg-red-600'>
                    <p className="text-lg text-white mb-1">Account Email / Number:</p>
                    <input className={`text-lg ${editMode ? "text-black" : "text-white"} text-center font-semibold w-[250px] rounded px-3 outline-none border-none`} name="email" onChange={handleInp} type={editMode ? "text" : "button"} value={selectedCard.email} readOnly={!editMode} />
                  </div>
                  <div className='px-16 py-1.5  rounded-lg flex flex-col items-center justify-center gap-x-4 bg-red-600'>
                    <p className="text-lg text-white mb-1">Account Password:</p>
                    <input className={`text-lg text-center ${editMode ? "text-black" : "text-white"} font-semibold w-[250px] rounded px-3 outline-none border-none`} name="password" onChange={handleInp} type={editMode ? "text" : "button"} value={selectedCard.password} readOnly={!editMode} />
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Details