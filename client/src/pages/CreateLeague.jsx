import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import getUserId from '../services/getUserId';
import apiUrl from '../services/serverConfig';

const CreateLeague = () => {
  const [gamesSelectMax, setGamesSelectMax] = useState('');
  const [gamesSelectMin, setGamesSelectMin] = useState('');
  const [name, setName] = useState('');
  const [weeklyPoints, setWeeklyPoints] = useState('');
  const [teamName, setTeamName] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const userId = getUserId();
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert gamesSelectMax and gamesSelectMin to numbers for comparison
    const max = Number(gamesSelectMax);
    const min = Number(gamesSelectMin);

    // Validate gamesSelectMax and gamesSelectMin
    if (max < min) {
      alert('gamesSelectMax must be greater than or equal to gamesSelectMin');
      return;
    }

    // Send the form data to the backend
    const formData = {
      gamesSelectMax: max,
      gamesSelectMin: min,
      name,
      sport: 'nfl',
      type: 'league',
      weeklyPoints,
      year: 2024,
    };

    try {
      const res = await axios.post(`${apiUrl}/createleague`, formData);

      const leagueId = res.data.id; // Assuming the response contains the ID of the created league

      console.log(res);
      console.log('league id', leagueId);

      await axios.post(
        `${apiUrl}/leagueregistration/${leagueId}/users/${userId}`,
        {
          league_role: 'commish',
          team_name: teamName,
        }
      );

      alert('League Created Successfully!');
      navigate(`/league/${leagueId}`); // Redirect to the league home page
    } catch (err) {
      if (err.response) {
        console.error(err.response.data);
      } else {
        console.error(err.message);
      }
    }
  };

  return (
    <div>
      <h1>Create Fantasy Football League</h1>
      {registrationSuccess ? (
        <div>League Created Successfully!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Games Select Max:
            <input
              type="number"
              value={gamesSelectMax}
              onChange={(e) => setGamesSelectMax(e.target.value)}
            />
          </label>
          <br />
          <label>
            Games Select Min:
            <input
              type="number"
              value={gamesSelectMin}
              onChange={(e) => setGamesSelectMin(e.target.value)}
            />
          </label>
          <br />
          <label>
            League Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <br />
          <label>
            Weekly Points:
            <input
              type="number"
              value={weeklyPoints}
              onChange={(e) => setWeeklyPoints(e.target.value)}
            />
          </label>
          <br />
          <label>
            Team Name:
            <input
              type="text"
              placeholder="Team Name"
              name="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Create League</button>
        </form>
      )}
    </div>
  );
};

export default CreateLeague;
