import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PollParticipant = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    fetch(`/api/polls/${pollId}`).then(res => res.json()).then(setPoll);
  }, [pollId]);

  const submitVote = async () => {
    await axios.post(`/api/polls/${pollId}/vote`, selected);
    alert('Vote submitted!');
  };

  if (!poll) return <div>Loading...</div>;

  return (
    <div>
      <h1>{poll.title}</h1>
      {poll.questions.map((q, i) => (
        <div key={i}>
          <h2>{q.q}</h2>
          {q.options.map((opt, j) => (
            <label key={j}>
              <input type="radio" name={`q${i}`} value={j} onChange={(e) => setSelected({ ...selected, [i]: parseInt(e.target.value) })} />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={submitVote}>Submit Votes</button>
      {/* Add QR code: <QRCode value={window.location.href} /> */}
    </div>
  );
};

export default PollParticipant;