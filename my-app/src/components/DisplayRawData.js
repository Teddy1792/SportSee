import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
  getUserActivityById,
  getUserAverageSessionsById,
  getUserPerformanceById,
} from '../services/dataService';
import '../styles/DisplayRawData.scss';

export const DisplayRawData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { id } = useParams();
  const userId = Number(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result;
        if (location.pathname.includes('/activity')) {
          result = await getUserActivityById(userId);
        } else if (location.pathname.includes('/average-sessions')) {
          result = await getUserAverageSessionsById(userId);
        } else if (location.pathname.includes('/performance')) {
          result = await getUserPerformanceById(userId);
        } else {
          throw new Error('Invalid route');
        }
        setData(result);
      } catch (e) {
        setError('An error occurred: ' + e.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, location]);

  if (loading) {
    return <div className='data'>Loading...</div>;
  }

  if (error) {
    return <div className='data'>{error}</div>;
  }
  return (
    <div className='data'>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};
