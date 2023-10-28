import '../styles/ActivityReport.scss';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import React from 'react';
import PropTypes from 'prop-types';
import blackOval from '../img/black-Oval.svg';
import redOval from '../img/red-Oval.svg';

export const ActivityReport = ({ userActivity }) => {
  const data = userActivity.sessions.map((session, index) => ({
    ...session,
    day: index + 1
  }));
  // Calculating the minimum and maximum kilogram values
  const kilogramValues = data.map(session => session.kilogram);
  const minKilogram = Math.min(...kilogramValues) - 1;
  const maxKilogram = Math.max(...kilogramValues) + 1;

  // Setting a maxY for calories
  const maxCalories = 400;

  // Create ticks for YAxis from minKilogram to maxKilogram
  const yAxisTicks = [];
  for (let i = minKilogram; i <= maxKilogram; i++) {
    yAxisTicks.push(i);
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          height: '70px',
          width: '40px',
          backgroundColor: 'red',
          padding: '10px',
          color: 'white',
          fontSize: '10px',
          fontWeight: 'bold',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <p style={{ margin: 0, marginBottom: '20px' }}>{payload[0].value}kg</p>
          <p style={{ margin: 0 }}>{payload[1].value}kCal</p>
        </div>
      );
    }
  
    return null;
  };
  

  return (
    <section className='userActivity'>
      <div className='labels'>
        <span className='title'>Activité quotidienne</span>
        <div className='legend'>
          <span className='weight'><img src={blackOval} alt='un point noir'/><span>Poids(kg)</span></span>
          <span className='cal'><img src={redOval} alt='un point rouge'/><span>Calories brûlées(kCal)</span></span>
        </div>
      </div>
      <BarChart
        width={835}
        height={320}
        data={data}
        margin={{
          top: 5, right: 10, left: 0, bottom: 5,
        }}
        barCategoryGap={45}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis 
        dataKey="day" 
        tickLine={false} 
        scale="point"
        padding={{
          top: 5, right: 15, left: 19, bottom: 5,
        }}
        />
        <YAxis 
          yAxisId="left" 
          orientation="right" 
          domain={[minKilogram, maxKilogram]} 
          ticks={yAxisTicks}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis 
          yAxisId="right" 
          orientation="right" 
          domain={[0, maxCalories]} 
          hide={true}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar yAxisId="left" radius={[20, 20, 0, 0]} maxBarSize={10} dataKey="kilogram" fill="#24282c" />
        <Bar yAxisId="right" radius={[20, 20, 0, 0]} maxBarSize={10} dataKey="calories" fill="#e60001" />
      </BarChart>
    </section>
  );
}

ActivityReport.propTypes = {
  userActivity: PropTypes.shape({
    sessions: PropTypes.arrayOf(
      PropTypes.shape({
        kilogram: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
