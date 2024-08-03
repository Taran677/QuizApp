import React, { useEffect, useState } from 'react';
import styles from './Leaderboard.module.css';
import Loading from './Loading';

const Leaderboard = ({setError}) => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/leaderboard', {
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
        setLeaderboardData(data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
        setError(`${error}`)
      }
    };

    fetchLeaderboardData();
  }, []);

  if (!leaderboardData.length) {
    return <Loading/>;
  }

  return (
    <div className={styles.leaderboardContainer}>
      <h1 className={styles.leaderboardTitle}>Leaderboard</h1>
      <table className={styles.leaderboardTable}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((user, index) => (
            <tr key={user.username}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
