import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';

function Cards() {
    const { posts, viewDetails } = useGlobalContext();

    return (
        <div className='container mx-auto p-5'>
            {posts && posts.length > 0 ? (
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5'>
                    {posts.map((post) => (
                        <div key={post._id} className="post bg-white custom-shadow shadow-lg rounded-lg overflow-hidden">
                            <div className="overflow-hidden p-2">
                                <img src={post.image} alt={post.accountTitle} className="w-full h-64 object-cover rounded-lg" />
                            </div>
                            <div className="post-body p-6 flex flex-col justify-center items-center">
                                <h2 className="post-title text-2xl font-bold mb-2">{post.accountTitle}</h2>
                                <h3 className="text-xl mb-4">PKR: <span className="font-semibold">{post.accountNumber}</span></h3>
                                <Link className='no-underline w-full' to={"/details"}>
                                    <button onClick={() => viewDetails(post._id, post)} className="bg-red-500 cursor-pointer text-white py-2 font-semibold px-4 w-full rounded hover:bg-red-600 transition duration-300">View Details</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center w-full text-gray-600">
                    <p className='text-2xl mt-3 mb-3 font-semibold'>No card items found.</p>
                </div>
            )}
        </div>
    );
}

export default Cards;

