import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Profile.module.css';
import Loading from "./Loading.jsx";

const Profile = () => {
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        // Assuming token might be in cookies
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('authToken='))
          ?.split('=')[1];
        console.log('Token:', token);

        const response = await axios.get(
          'https://quizapp-68lr.onrender.com/api/user/stats',
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`, // Assuming the token should be in Bearer format
            },
            withCredentials: true,
          }
        );

        setUserStats(response.data);
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };

    fetchUserStats();
  }, []);

  if (!userStats) {
    return <Loading />;
  }

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.profileTitle}>Profile</h1>
      <div className={styles.statItem}>
        <span className={styles.statLabel}>Username:</span>
        <span className={styles.statValue}>{userStats.username}</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statLabel}>Score:</span>
        <span className={styles.statValue}>{userStats.score}</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statLabel}>Total Questions:</span>
        <span className={styles.statValue}>{userStats.totalQuestions}</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statLabel}>Correct Questions:</span>
        <span className={styles.statValue}>{userStats.correctQuestions}</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statLabel}>Unanswered Questions:</span>
        <span className={styles.statValue}>{userStats.unansweredQuestions}</span>
      </div>
      <div className={styles.statItem}>
        <span className={styles.statLabel}>Quizzes Attended:</span>
        <span className={styles.statValue}>{userStats.quizzesAttended}</span>
      </div>
    </div>
  );
};

export default Profile;
