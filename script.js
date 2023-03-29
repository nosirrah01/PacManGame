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

    // Update and draw the ghosts
    updateGhosts();

    // Check for collisions with pellets and update the score
    checkPellets();
    scoreElement.innerText = score;

    // Update the scared timer for the ghosts
    updateScaredTimer();

    // Request the next frame
    requestAnimationFrame(update);
}

// Initialize game components
createGhosts();
createPellets();
update();
