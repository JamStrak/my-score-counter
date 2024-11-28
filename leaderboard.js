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

        // Add animation for entry appearance
        entry.style.opacity = 0;
        entry.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            entry.style.opacity = 1;
        }, 100);
    });
}

function resetScores() {
    try {
        localStorage.setItem('scores', JSON.stringify([]));
        updateLeaderboardDisplay([]);
        // Add visual feedback for reset action
        const resetButton = document.getElementById('reset-button');
        resetButton.classList.add('button-clicked');
        setTimeout(() => {
            resetButton.classList.remove('button-clicked');
        }, 200);
    } catch (error) {
        console.error('Error resetting scores:', error);
    }
}