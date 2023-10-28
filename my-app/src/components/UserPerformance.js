import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import '../styles/UserPerformance.scss';
import PropTypes from 'prop-types';

// Translation object
const translations = {
  cardio: 'cardio',
  energy: 'énergie',
  endurance: 'endurance',
  strength: 'force',
  speed: 'vitesse',
  intensity: 'intensité'
};

export const UserPerformance = ({ userPerformance }) => {
  console.log("userPerformance:", userPerformance)
    // Find the index of 'intensité' in the data array
    const intensityIndex = userPerformance.data.findIndex(
      item => userPerformance.kind[item.kind] === 'intensity'
    );
  
    // Rotate the data array to start with 'intensité'
    const reorderedData = [
      ...userPerformance.data.slice(intensityIndex),
      ...userPerformance.data.slice(0, intensityIndex)
    ];
  
    return (
      <div className='UserPerformanceContainer'>
        <ResponsiveContainer width={260} height={260}>
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="70%"
            data={reorderedData.map(item => ({
              kind: translations[userPerformance.kind[item.kind]],
              value: item.value,
            }))}
          >
                <PolarGrid radialLines={false} stroke="white" />
                <PolarAngleAxis
                dataKey="kind"
                axisLine={false}
                tickLine={false}
                tick={{
                    fill: 'white',
                    fontSize: '12px',
                    fontWeight: 'bold'
                }}
                />
                <Radar
                name="Performance"
                dataKey="value"
                stroke="none"
                fill="#FF0101"
                fillOpacity={0.7}
                />
            </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

UserPerformance.propTypes = {
  userPerformance: PropTypes.shape({
    data: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.number.isRequired,
        kind: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      })
    ).isRequired,
    kind: PropTypes.objectOf(PropTypes.string).isRequired,
  }).isRequired,
};