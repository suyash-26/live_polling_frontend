import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Charts from './Charts';

const PresenterView = () => {
  const { pollId } = useParams();
  const [pollData, setPollData] = useState(null);
  const [votes, setVotes] = useState([]);
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
  const socket = io(SOCKET_URL);

  useEffect(() => {
    // Fetch initial poll data
    fetch(`/api/polls/${pollId}`).then(res => res.json()).then(setPollData);

    // Socket for real-time votes
    socket.emit('join-poll', pollId);
    socket.on('vote-update', (newVotes) => {
      setVotes(newVotes);
      // Animate/re-render charts
    });

    return () => socket.disconnect();
  }, [pollId]);

  if (!pollData) return <div>Loading...</div>;

  return (
    <div style={{ background: 'black', color: 'white', padding: '20px', textAlign: 'center' }}>
      <h1>{pollData.title}</h1>
      {pollData.questions.map((q, i) => (
        <div key={i}>
          <h2>{q.q}</h2>
          <Charts data={/* Build data from votes for this question */ { labels: q.options, datasets: [{ data: votes[i] || [0, 0] }] }} type={q.type} />
        </div>
      ))}
    </div>
  );
};

export default PresenterView;