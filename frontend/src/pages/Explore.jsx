import React from 'react'
import { useEffect } from 'react'

import axios from 'axios'
import endpoints from '../api/endpoints'
import { useUser } from '../context/UserProvider'
import { useState } from 'react'
import RecommendedAccountCard from '../components/RecommendedAccountCard'

const Explore = () => {

  const {isLoggedIn} = useUser();
  const [recommendations, setRecommendations] = useState([]);

  const getRecommendations = async ()=>{
    const res = await axios.get(endpoints.getRecommendations, {
      headers:{
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    setRecommendations(res.data.recommendations);
  }

  useEffect(()=>{
    if (isLoggedIn){
      getRecommendations()
    }
  },[isLoggedIn])

  return (
    <div>
      {
        isLoggedIn ? (
          <div className='text-white p-3 flex flex-col gap-2'>
            <h2 className='text-3xl'>Recommended Users to Connect With:</h2>
            <div>
              {recommendations.map((user,idx)=>(
                <RecommendedAccountCard key={idx} user={user} />
              ))}
            </div>
          </div>
        ) : (
          <p>Please log in to see recommendations.</p>
        )
      }
    </div>
  )
}

export default Explore