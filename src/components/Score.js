import React from 'react';

const Score = ({
    className = '',
    onVoteUp = () => {},
    onVoteDown = () => {},
    voteScore = 0
}) => {
    return (
        <div className="score-container">
            <span className="score">
                Score: {voteScore}
            </span>
            <button className="score-vote" onClick={onVoteUp}>
                ↑
            </button>
            <button className="score-vote" onClick={onVoteDown}>
                ↓
            </button>
        </div>
    );
};

export default Score;
