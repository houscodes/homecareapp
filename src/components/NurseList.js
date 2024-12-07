import React from 'react';
import { useNavigate } from 'react-router-dom';

const NurseList = ({nurse}) => {
    const navigate = useNavigate()
  return (
    <>
    <div className='card m-2' style={{cursor:"pointer"}} onClick={()=>navigate(`/nurse/book-appointment/${nurse._id}`)}>
        <div className='card-header'>
            Nurse {nurse.firstName} {nurse.lastName}
        </div>
        <div className='card-body'>
            <p>
                <b>Specialization</b> {nurse.specialization}
            </p>
            <p>
                <b>Email</b> {nurse.email}
            </p>
            <p>
                <b>Address</b> {nurse.address}
            </p>
            <p>
                <b>Experience</b> {nurse.experience}
            </p>
            <p>
                <b>Fees Per Consultation</b> {nurse.feesPerConsultation}
            </p>
            <p>
                <b>Every day availability</b> {nurse.timings[0]} - {nurse.timings[1]}
            </p>
        </div>
    </div>
    
    </>
  )
}

export default NurseList

//mafroud a3melon clickable la7atta bas ef2es a3mel redirection 3ala matra7 ma lezim ya3mel appointment