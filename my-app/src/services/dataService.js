import {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} from '../file/data.js'

import {  
        UserMainData, 
        UserActivity, 
        UserAverageSessions, 
        UserPerformance 
} from '../services/dataModel';

// Function to get the user's first name
export const getUserFirstNameById = async (id) => {
  if (process.env.REACT_APP_USE_MOCKED_DATA === 'true') {
    const user = USER_MAIN_DATA.find(user => user.id === id);
    return user ? new UserMainData(user).getFirstName() : 'User not found';
  } else {
    try {
      const response = await fetch(`http://localhost:3000/user/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok. Status: ' + response.statusText);
      }
      const data = await response.json();
      // Adjust this check to look for 'data' and then 'userInfos' within 'data'
      if (data && 'data' in data && 'userInfos' in data.data) {
        // If the structure is correct, pass the 'data' property to UserMainData
        const user = new UserMainData(data.data);
        return user.getFirstName();
      } else {
        console.error('Unexpected API response format:', data);
        return 'User not found'; // or handle the error as needed
      }
    } catch (error) {
      console.error('Fetch error: ', error);
      throw error;
    }
  }
};


// Function to get the main data by user ID
export const getUserMainDataById = async (id) => {
  if (process.env.REACT_APP_USE_MOCKED_DATA === 'true') {
    const user = USER_MAIN_DATA.find(user => user.id === id);
    return user ? new UserMainData(user) : null;
  } else {
    try {
      const response = await fetch(`http://localhost:3000/user/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
      }
      const data = await response.json();
      // Check for 'data' and then 'userInfos' within 'data'
      if (data && 'data' in data && 'userInfos' in data.data) {
        // If the structure is correct, pass the 'data' property to UserMainData
        return new UserMainData(data.data);
      } else {
        console.error('Unexpected API response format');
        return null; // or handle the error as needed
      }
    } catch (error) {
      console.error('Fetch error: ', error);
      throw error;
    }
  }
};


// Function to get the activity data by user ID
export const getUserActivityById = async (userId) => {
  if (process.env.REACT_APP_USE_MOCKED_DATA === 'true') {
    const userActivity = USER_ACTIVITY.find(activity => activity.userId === userId);
    return userActivity ? new UserActivity(userActivity) : null;
  } else {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}/activity`);
      if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
      }
      const apiResponse = await response.json();
      if (apiResponse && 'data' in apiResponse && 'sessions' in apiResponse.data) {
        const { sessions } = apiResponse.data;
        if (Array.isArray(sessions)) {
          return new UserActivity({ userId, sessions });
        } else {
          console.error('Unexpected format for sessions');
          return null; // or handle the error as needed
        }
      } else {
        console.error('Unexpected API response format');
        return null; // or handle the error as needed
      }
    } catch (error) {
      console.error('Fetch error: ', error);
      throw error;
    }
  }
};

// Function to get the average session data by user ID
export const getUserAverageSessionsById = async (userId) => {
  if (process.env.REACT_APP_USE_MOCKED_DATA === 'true') {
    const userAverageSession = USER_AVERAGE_SESSIONS.find(session => session.userId === userId);
    return userAverageSession ? new UserAverageSessions(userAverageSession) : null;
  } else {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}/average-sessions`);
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      const data = await response.json();
      // Adjust this check to look for 'data' and then 'sessions' within 'data'
      if (data && 'data' in data && 'sessions' in data.data) {
        // If the structure is correct, pass the 'data' property to UserAverageSessions
        return new UserAverageSessions(data.data);
      } else {
        console.error('Unexpected API response format :', data);
        return null; // or handle the error as needed
      }
    } catch (error) {
      console.error('Fetch error: ', error);
      throw error;
    }
  }
};


// Function to get the performance data by user ID
export const getUserPerformanceById = async (userId) => {
  if (process.env.REACT_APP_USE_MOCKED_DATA === 'true') {
    const userPerformance = USER_PERFORMANCE.find(performance => performance.userId === userId);
    return userPerformance ? new UserPerformance(userPerformance) : null;
  } else {
    try {
      const response = await fetch(`http://localhost:3000/user/${userId}/performance`);
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
      const data = await response.json();
      // Check for 'data' and then 'kind' and 'data' within 'data'
      if (data && 'data' in data && 'kind' in data.data && 'data' in data.data) {
        // If the structure is correct, pass the 'data' property to UserPerformance
        return new UserPerformance(data.data);
      } else {
        console.error('Unexpected API response format:', data);
        return null; // or handle the error as needed
      }
    } catch (error) {
      console.error('Fetch error: ', error);
      throw error;
    }
  }
};

