import React from 'react';
import Login from './Components/Auth/Login';
import MatchList from './Components/Matches/MatchList';
import CreateTeam from './Components/Team/CreateTeam';
import Signup from './Components/Auth/SignupAuth';
import MatchSchedule from './Components/Matches/MatchSchedule';
import Live from './Components/Matches/Live';




function App() {
  return (
    <div>
      <h1>Fantasy Sports</h1>
{/*       
      <Login /> */}
      {/* <MatchList /> */}
      {/* <CreateTeam /> */}
      {/* <Signup /> */}
      <MatchSchedule />
      <Live />

   
    
     
    </div>
  );
}

export default App;
