import pool from '../config/db.js';

export const submitPicks = async (req, res) => {
  const { userId, leagueId, gameId, points } = req.body;

  try {
    const [selections] = await pool.query(
      'SELECT * FROM users_select_games WHERE user_id = ? AND league_id = ?',
      [userId, leagueId]
    );
    if (selections.length > 0) {
      await pool.query(
        'DELETE FROM users_select_games WHERE user_id = ? AND league_id = ?',
        [userId, leagueId]
      );
    }

    await pool.query(
      'INSERT INTO users_select_games (user_id, league_id, game_id, created_at, updated_at, points) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, leagueId, gameId, createdAt, updatedAt, points]
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send(`Server error: ${err.message}`);
  }
};
