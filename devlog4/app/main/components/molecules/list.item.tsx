import React from 'react';
import Profile from '../atoms/pk.profile';

interface ListItemProps {
  title: string;
  subTitle: string;
};

const ProfileComponent = () => {
  const props = {
    name: '이름',
    icon: '아이콘클래스'
  };
  return <Profile {...props}/>
}

const ListItem = ({
  title,
  subTitle
}: ListItemProps) => {

  return (
    <div>
      <div><ProfileComponent /></div>
      <h1>{title}</h1>
      <p>{subTitle}</p>
    </div>
  )
}

export default ListItem