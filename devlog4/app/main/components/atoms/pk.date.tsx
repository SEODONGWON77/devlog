import React from 'react';

interface DateProps {
  date: React.ReactNode;
  format: 'date' | 'month' | 'day';
}

const Date = ({
  date
  , format
}: DateProps) => {

  

  return (
    <div>{date}</div>
  )
}

export default Date