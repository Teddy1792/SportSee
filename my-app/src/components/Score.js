import React from 'react';
import '../styles/Score.scss'
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';

export const Score = ({ userScore }) => {
  // Ensuring userScore is in [0, 1]
  const score = Math.min(Math.max(userScore, 0), 1) * 100;
  const data = [{ name: 'Score', value: score, fill: '#FF0101' }];
  
  return (
    <div className='scoreContainer'>
    <div className='titreScore'>Score</div>
    <ResponsiveContainer 
      width={260} 
      height={260} 
      style={{ backgroundColor: '#FBFBFB' }}
    >
      <RadialBarChart
        innerRadius="60%"
        outerRadius="72%"
        data={data}
        startAngle={180}
        endAngle={-270}
        background={<circle cx="50%" cy="50%" outerRadius="80%" fill="#FBFBFB" />}
      >
        <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
        <RadialBar
          clockWise
          dataKey="value"
          cornerRadius={10}
        />
      </RadialBarChart>
    </ResponsiveContainer>
    <div className='circleCenter'>
      <div className='scoreText'> <span className='percentage'>{score}%</span> de votre objectif</div>
      </div>
    </div>
  );
};
