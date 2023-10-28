import '../styles/LengthReport.scss';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import React from 'react';
import PropTypes from 'prop-types';

export const LengthReport = ({ lengthActivity }) => {
  const dayLabels = ["L", "M", "M", "J", "V", "S", "D", ""];

  // Calculate the maximum sessionLength in the dataset
  const maxSessionLength = Math.max(...lengthActivity.map(session => session.sessionLength));

  if (!lengthActivity || lengthActivity.length < 2) return null;

  // Calculate the slope between the first two points and the last two points
  const firstSlope = (lengthActivity[1].sessionLength - lengthActivity[0].sessionLength) / (lengthActivity[1].day - lengthActivity[0].day);
  const lastSlope = (lengthActivity[lengthActivity.length - 1].sessionLength - lengthActivity[lengthActivity.length - 2].sessionLength) / (lengthActivity[lengthActivity.length - 1].day - lengthActivity[lengthActivity.length - 2].day);

  // Extrapolate the sessionLength one step before the first point and one step after the last point
  const firstExtrapolatedSessionLength = lengthActivity[0].sessionLength - firstSlope;
  const lastExtrapolatedSessionLength = lengthActivity[lengthActivity.length - 1].sessionLength + lastSlope;

  const extendedData = [
    { day: 0, sessionLength: firstExtrapolatedSessionLength }, // extra point at the beginning
    ...lengthActivity,
    { day: 8, sessionLength: lastExtrapolatedSessionLength }, // extra point at the end
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          height: '20px',
          width: '40px',
          backgroundColor: 'white',
          padding: '10px',
          color: 'black',
          fontSize: '10px',
          fontWeight: 'bold',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <p style={{ margin: 0 }}>{payload[0].payload.sessionLength} min</p>
        </div>
      );
    }
  
    return null;
  };

  return (
    <div className='backgroundcolor'>
        <div className='title'>Durée moyenne des sessions</div>
        <LineChart
          width={260}
          height={260}
          data={extendedData}
          margin={{
            top: 0, right: -10, left: -10, bottom: 0,
          }}

        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="0">
              <stop offset="5%" stopColor="white" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="white" stopOpacity={1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} />
          <XAxis 
            dataKey="day" 
            tickFormatter={(tickItem) => tickItem === 0 ? '' : dayLabels[tickItem - 1]}
            tickLine={false}
            axisLine={false}
            tick={{fontSize: '12px', fill: '#FFFFFF', fillOpacity: 0.5}}
          />
          <YAxis 
          domain={[0, maxSessionLength * 2]}
          width={0}
            tick={false}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="sessionLength" 
            dot={false}
            stroke="url(#colorUv)" 
            activeDot={{ r: 8 }} 
            strokeWidth={4}
          />
        </LineChart>
    </div>
  );
}

LengthReport.propTypes = {
  lengthActivity: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.number.isRequired,
      sessionLength: PropTypes.number.isRequired,
    })
  ).isRequired,
};