import React from 'react'

interface ProfileProps {
  name: string;
  icon: string;
}

const Profile = ({name, icon}: ProfileProps) => {
  return (
    <>
      <p>{name}</p>
      <i className={icon}></i>
    </>
  )
}

export default Profile