import React, { useEffect } from 'react'

const RecommendedAccountCard = ({user}) => {

    useEffect(()=>{
        console.log(user);
    })

  return (
    <div className='flex text-black bg-pink-200/70 mb-2 p-3 gap-4 justify-end rounded-lg items-center flex-col border border-gray-300'>
        <p className='text-xl'>{user?.username}</p>
        <p>Skills: {user?.matchedSkills.join(", ")}</p>
        <button className='bg-blue-500 text-white px-2 py-1 rounded-lg w-full'>Connect</button>
    </div>
  )
}

export default RecommendedAccountCard