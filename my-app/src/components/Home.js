import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    getUserFirstNameById,
    getUserAverageSessionsById,
    getUserActivityById,
    getUserPerformanceById,
    getUserMainDataById
} from '../services/dataService.js';

import { Welcome } from './Welcome';
import { ActivityReport } from './ActivityReport';
import { LengthReport } from './LengthReport';
import { UserPerformance } from './UserPerformance';
import { Score } from './Score'
import { Card } from './Card'

import { ReactComponent as FatIcon } from '../img/fat-icon.svg';
import { ReactComponent as CarbsIcon } from '../img/carbs-icon.svg';
import { ReactComponent as ProteinIcon } from '../img/protein-icon.svg';
import { ReactComponent as CalorieIcon } from '../img/calories-icon.svg';
import '../styles/Home.scss';

export function Home() {
  const { id } = useParams();
  const userId = Number(id);

  // Initializing state for various user data
  const [userName, setUserName] = useState('');
  const [userActivity, setUserActivity] = useState(null);
  const [lengthActivity, setLengthActivity] = useState(null);
  const [userPerformance, setUserPerformance] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetching and setting user name
    getUserFirstNameById(userId)
      .then(userName => {
        setUserName(userName);
      })
      .catch(error => console.error('Error fetching user name:', error));
    
    // Fetching and setting user activity
    getUserActivityById(userId)
      .then(activity => {
        setUserActivity(activity);
      })
      .catch(error => console.error('Error fetching user activity:', error));
  
    // Fetching and setting length of activity
    getUserAverageSessionsById(userId)
    .then(activity => {
      setLengthActivity(activity.sessions); 
    })
    .catch(error => console.error('Error fetching length of activity:', error));
  
  
    // Fetching and setting user performance
    getUserPerformanceById(userId)
      .then(performance => {
        setUserPerformance(performance);
      })
      .catch(error => console.error('Error fetching user performance:', error));
  
    // Fetching and setting main user data
    getUserMainDataById(userId)
      .then(data => {
        setUserData(data);
      })
      .catch(error => console.error('Error fetching main user data:', error));
  }, [userId]);
  

  // Extracting additional data once userData is available
  const userScore = userData?.todayScore ?? userData?.score ?? 0;
  const { calorieCount, proteinCount, carbohydrateCount, lipidCount } = userData?.keyData || {};
  return (
    <section className='home'>
      {userName ? <Welcome userName={userName}/> : null}
      <div className='dataDisplay'>
        <div className='leftColumn'>
          <div className='upperRow'>
            {userActivity ? <ActivityReport userActivity={userActivity} /> : null}
          </div>
          <div className='bottomRow'>
            {lengthActivity ? <LengthReport lengthActivity={lengthActivity} /> : null}
            {userPerformance ? <UserPerformance userPerformance={userPerformance} /> : null}
            {userScore ? <Score userScore={userScore} /> : null}
          </div>
        </div>
        <div className='rightColumn'>
          {calorieCount ? <Card title="Calories" value={calorieCount} unit="kCal" Icon={CalorieIcon} /> : null}
          {proteinCount ? <Card title="Protéines" value={proteinCount} unit="g" Icon={ProteinIcon} /> : null}
          {carbohydrateCount ? <Card title="Glucides" value={carbohydrateCount} unit="g" Icon={CarbsIcon} /> : null}
          {lipidCount ? <Card title="Lipides" value={lipidCount} unit="g" Icon={FatIcon} /> : null}
        </div>
      </div>
    </section>
  ); 
}