document.addEventListener('DOMContentLoaded', () => {
    const leaderboardElement = document.getElementById('leaderboard');
    const resetButton = document.getElementById('reset-button');
    const savedScores = JSON.parse(localStorage.getItem('scores')) || [];
    updateLeaderboardDisplay(savedScores);

    resetButton.addEventListener('click', resetScores);
});

function calculateTotalScores(savedScores) {
    let totalScores = {};

    savedScores.forEach(game => {
        game.forEach(player => {
            if (!totalScores[player.name]) {
                totalScores[player.name] = 0;
            }
            totalScores[player.name] += player.score;
        });
    });

    return totalScores;
}

function updateLeaderboardDisplay(savedScores) {
    const leaderboardElement = document.getElementById('leaderboard');
    leaderboardElement.innerHTML = ''; // Clear existing entries
    const totalScores = calculateTotalScores(savedScores);

    Object.keys(totalScores).sort((a, b) => totalScores[b] - totalScores[a]).forEach(name => {
        const entry = document.createElement('div');
        entry.classList.add('leaderboard-entry');
        entry.textContent = `${name}: ${totalScores[name]}`;
        leaderboardElement.appendChild(entry);
    });
}

function resetScores() {
    localStorage.setItem('scores', JSON.stringify([]));
    updateLeaderboardDisplay([]);
}