import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const UserDashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <p>Please login to view your dashboard.</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Balance: ${user.balance}</p>
      <p>Upcoming Matches: {user.upcomingMatches.length}</p>
      {/* अन्य जानकारी यहां दिखा सकते हैं */}
    </div>
  );
};

export default UserDashboard;
