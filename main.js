initMaze();

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

let score = 0;

function update() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw the maze
    drawMaze(ctx);

    // Update and draw Pac-Man
    updatePacman();

    // Update and draw the pellets and power pellets
    drawPellets();

    // Update and draw the ghosts
    updateGhosts();

    // Check if Pac-Man has collected a pellet or power pellet
    checkPellets();

    // Update the scared timer for the ghosts
    updateScaredTimer();

    // Update the score display
    scoreElement.innerText = score;

    // Repeat the update function
    requestAnimationFrame(update);
}

function resetGameState() {
    // Regenerate the maze
    initMaze();

    // Reset Pac-Man's position
    pacmanStartPosition = getRandomOpenPosition();
    pacman.x = pacmanStartPosition.x;
    pacman.y = pacmanStartPosition.y;

    // Respawn ghosts
    respawnGhosts();

    // Reset pellets and power pellets
    pellets = [];
    powerPellets = [];
    createPellets();

    // Reset score
    score = 0;
    document.getElementById("score").textContent = score;

    console.log("Game State Reset");
}

// Initialize game components
createGhosts();
createPellets();
update();
