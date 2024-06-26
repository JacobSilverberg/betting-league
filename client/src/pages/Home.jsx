import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Want to kick your friend&apos;s asses?</h1>
      <h2>Season-long ATS and Pick &apos;em fantasy leagues.</h2>
      <span>
        Want to join the fun? <Link to="/register">Register now!</Link>
      </span>
      <span>
        Already a member? <Link to="/login">Login</Link>
      </span>
    </div>
  );
};

export default Home;
