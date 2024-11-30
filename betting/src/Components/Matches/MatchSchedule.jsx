import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MatchSchedule.css"; // CSS file for styling

const MatchSchedule = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSchedule = async () => {
    setLoading(true);
    setError(null);
    try {
      const options = {
        method: "GET",
        url: "https://cricbuzz-cricket.p.rapidapi.com/matches/v1/upcoming",
        headers: {
          "x-rapidapi-key": "92e284e6a6mshdbd2d0f2fb1bc44p1caf01jsn5eb50415eedc",
          "x-rapidapi-host": "cricbuzz-cricket.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      const matchData = processMatches(response.data);
      setMatches(matchData);
    } catch (err) {
      setError("Failed to load matches. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Process API response to extract match data
  const processMatches = (data) => {
    const matchList = [];
    if (data?.matchScheduleMap) {
      data.matchScheduleMap.forEach((schedule) => {
        schedule.scheduleAdWrapper?.matchScheduleList?.forEach((match) => {
          match.matchInfo?.forEach((info) => {
            if (info.startDate && info.team1 && info.team2 && info.venueInfo) {
              const startDate = new Date(parseInt(info.startDate));
              matchList.push({
                seriesName: schedule.seriesName || "Unknown Series",
                matchName: `${info.team1.teamName} vs ${info.team2.teamName}`,
                date: startDate.toLocaleDateString(),
                venue: info.venueInfo.ground || "Unknown Venue",
                time: startDate.toLocaleTimeString(),
              });
            }
          });
        });
      });
    }
    return matchList;
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return (
    <div className="match-schedule">
      <h2 className="title">Upcoming Cricket Matches</h2>
      {loading && <p>Loading matches...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && matches.length === 0 && <p>No matches found.</p>}
      <div className="match-list">
        {matches.map((match, index) => (
          <div key={index} className="match-card">
            <h3 className="series-name">{match.seriesName}</h3>
            <p><strong>Match:</strong> {match.matchName}</p>
            <p><strong>Date:</strong> {match.date}</p>
            <p><strong>Venue:</strong> {match.venue}</p>
            <p><strong>Time:</strong> {match.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchSchedule;
