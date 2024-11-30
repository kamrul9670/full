import React from 'react';

const matches = [
  { id: 1, team1: 'India', team2: 'Australia', date: '2024-11-20' },
  { id: 2, team1: 'England', team2: 'Pakistan', date: '2024-11-21' },
];

const MatchList = () => {
  return (
    <div>
      <h2>Upcoming Matches</h2>
      <ul>
        {matches.map((match) => (
          <li key={match.id}>
            {match.team1} vs {match.team2} - {match.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchList;
