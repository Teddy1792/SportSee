import React from 'react';
import '../styles/Card.scss'

// Card Component
export const Card = ({ title, value, unit, Icon }) => {
  return (
    <div className='nutrition-card'>
      <Icon alt={`${title} icon`} />
      <div className='nutrition-text'>
        <h2>{`${value} ${unit}`}</h2>
        <p>{title}</p>
      </div>
    </div>
  );
};