import React, { useState } from 'react';

const players = [
  { id: 1, name: 'Player 1', team: 'India' },
  { id: 2, name: 'Player 2', team: 'Australia' },
];

const CreateTeam = () => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const handleSelectPlayer = (player) => {
    setSelectedPlayers((prev) => [...prev, player]);
  };

  return (
    <div>
      <h2>Create Your Team</h2>
      <ul>
        {players.map((player) => (
          <li key={player.id}>
            {player.name} ({player.team})
            <button onClick={() => handleSelectPlayer(player)}>Add</button>
          </li>
        ))}
      </ul>
      <h3>Selected Players:</h3>
      <ul>
        {selectedPlayers.map((player, index) => (
          <li key={index}>{player.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CreateTeam;
