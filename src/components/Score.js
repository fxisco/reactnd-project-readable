import React from 'react';

const Score = ({ className = '', voteScore = 0 }) => {
    return (
        <div className="score-container">
            <span className="score">
                Score: {voteScore}
            </span>
            <span className="score-vote">
                ↑
            </span>
            <span className="score-vote">
                ↓
            </span>
        </div>
    );
};

export default Score;
