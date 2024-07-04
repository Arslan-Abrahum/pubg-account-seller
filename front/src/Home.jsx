import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Cards from './Components/Cards';
import Footer from './Components/Footer';

function Home() {

  return (
    <div className='bg-white'>
      <Navbar   />

      <div className="h-[92vh] w-[100%] bg-image m-auto">
        <div className="flex flex-col justify-center items-center h-[100%] w-[100%]">
          <h1 className="text-6xl text-white font-bold uppercase">Gujjar pubg account seller</h1>
          <h3 className='text-2xl text-white font-semibold mt-10 uppercase'>high quality accounts carding in cheapest</h3>
          <button className='bg-red-500 mt-10 text-xl cursor-pointer text-white py-4 px-8 rounded hover:bg-red-600 transition-all duration-75'>
            <a href="#move" className='no-underline text-white'>View All</a>
          </button>
        </div>
      </div>   
      <div id='move' className="p-6 rounded-lg flex justify-center items-center flex-col">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 uppercase">All Carding Accounts</h1>
        <h2 className="text-xl text-gray-700 font-semibold uppercase">PUBG Accounts</h2>
      </div>

      <Cards  />
      <Footer />
    </div>
  );
}

export default Home;
