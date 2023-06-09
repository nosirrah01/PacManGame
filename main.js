initMaze();

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const gameOverContainer = document.getElementById('game-over-container');

// Set game over container width and height to match the canvas
gameOverContainer.style.width = (canvas.width + 20) + 'px';
gameOverContainer.style.height = (canvas.height + 20) + 'px';

let score = 0;
let gameOver = false;

function update() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // If the game is over, show the game over screen and reset the game state
    if (gameOver) {
        document.getElementById("game-over-container").style.display = "block";
        setTimeout(() => {
            document.getElementById("game-over-container").style.display = "none";
            resetGameState();
            gameOver = false; // Reset the game over flag
            requestAnimationFrame(update); // Restart the update loop
        }, 4000);
        return; // Exit the update loop
    }

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
    // Clear the old maze
    clearMaze();

    // Regenerate the maze
    initMaze();

    // Reset Pac-Man's position
    pacmanStartPosition = getRandomOpenPosition();
    pacman.x = pacmanStartPosition.x;
    pacman.y = pacmanStartPosition.y;

    // Reset Pac-Man's direction
    pacman.direction = 'right';
    pacman.nextDirection = 'right';

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

function adjustGameOverTextPosition() {
    const gameOverText = document.querySelector('#game-over-container h1');
    const canvasHeight = canvas.height;
    const textHeight = gameOverText.offsetHeight;
    const topPosition = (canvasHeight * 0.45) - (textHeight / 2);
    gameOverText.style.top = `${topPosition}px`;
}

adjustGameOverTextPosition();

// Initialize game components
createGhosts();
createPellets();
update();
