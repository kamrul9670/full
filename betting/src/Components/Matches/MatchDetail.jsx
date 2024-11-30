import React from 'react';

const MatchDetails = ({ match }) => {
  if (!match) {
    return <p>No match selected.</p>;
  }

  return (
    <div>
      <h2>Match Details</h2>
      <p>Teams: {match.team1} vs {match.team2}</p>
      <p>Date: {match.date}</p>
      <p>Venue: {match.venue}</p>
    </div>
  );
};

export default MatchDetails;
