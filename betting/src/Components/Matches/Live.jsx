import { useState } from 'react';
import axios from 'axios';
import React from 'react';

const Live = () => {
  const [liveMatches, setLiveMatches] = useState([]); // State to store live match data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const fetchLiveMatches = async () => {
    setLoading(true);
    setError(null);
    try {
      const options = {
        method: 'GET',
        url: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/live',
        headers: {
          'x-rapidapi-key': '92e284e6a6mshdbd2d0f2fb1bc44p1caf01jsn5eb50415eedc',
          'x-rapidapi-host': 'cricbuzz-cricket.p.rapidapi.com',
        },
      };

      const response = await axios.request(options);
      setLiveMatches(response.data.typeMatches || []); // Update state with live matches
      setLoading(false);
    } catch (err) {
      console.error('Error fetching live matches:', err);
      setError('Failed to fetch live matches. Please try again.');
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    fetchLiveMatches(); // Trigger API call on button click
  };

  return (
    <div>
      <h2>Live Cricket Matches</h2>
      <button onClick={handleButtonClick}>Fetch Live Matches</button>

      {loading && <p>Loading live matches...</p>}
      {error && <p>{error}</p>}

      {liveMatches.length > 0 ? (
        liveMatches.map((matchType, index) => (
          <div key={index}>
            <h3>{matchType.matchType}</h3> {/* Type of match (e.g., ODI, Test) */}
            {matchType.seriesMatches.map((series, idx) => (
              <div key={idx}>
                {series.seriesAdWrapper && (
                  <>
                    <h4>{series.seriesAdWrapper.seriesName}</h4> {/* Series name */}
                    {series.seriesAdWrapper.matches.map((match, idy) => (
                      <div key={idy}>
                        <p>
                          <strong>Match:</strong>{' '}
                          {match.matchInfo.team1.teamName} vs{' '}
                          {match.matchInfo.team2.teamName}
                        </p>
                        <p>
                          <strong>Venue:</strong> {match.matchInfo.venueInfo.ground}
                        </p>
                        <p>
                          <strong>Status:</strong> {match.matchInfo.matchStatus}
                        </p>
                        <hr />
                      </div>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>No live matches available.</p>
      )}
    </div>
  );
};

export default Live;
