import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import Loading from "./Loading.jsx"
const Profile = () => {
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await fetch('https://quizapp-68lr.onrender.com/api/user/stats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // To include cookies
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setUserStats(data);
      } catch (error) {
        console.error('Error fetching user stats:', error);
      }
    };

    fetchUserStats();
  }, []);

  if (!userStats) {
    return <Loading></Loading>
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
