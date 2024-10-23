import React from 'react'
import { useParams } from 'react-router-dom'

const Doctors = () => {
  const Speciality = useParams();
  console.log(Speciality);
  
  return (
    <div>

    </div>
  )
}

export default Doctors