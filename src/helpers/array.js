export const sortByDateASC = (a,b) => {
    return a.timestamp - b.timestamp;
};

export const sortByDateDESC = (a,b) => {
    return b.timestamp - a.timestamp;
};

export const sortByVoteScoreASC = (a,b) => {
    if (a.voteScore > b.voteScore) {
        return 1;
    }
    if (a.voteScore < b.voteScore) {
        return -1;
    }

    return 0;
};

export const sortByVoteScoreDESC = (a,b) => {
    if (a.voteScore < b.voteScore) {
        return 1;
    }
    if (a.voteScore > b.voteScore) {
        return -1;
    }

    return 0;
};
