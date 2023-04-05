//default speed is 2. changes to this should be temporary
const PACMAN_SPEED = 2;
let pacmanStartPosition = getRandomOpenPosition();
let pacman = {
    x: pacmanStartPosition.x,
    y: pacmanStartPosition.y,
    prevX: pacmanStartPosition.x,
    prevY: pacmanStartPosition.y,
    direction: 'right',
    nextDirection: 'right',
    mouthAngle: 0,
};
let lastMouthUpdateTime = 0;

function isCollision(newX, newY) {
    // Check for collision in all four corners of the Pac-Man sprite
    return isWall(newX, newY) || isWall(newX + 31, newY) || isWall(newX, newY + 31) || isWall(newX + 31, newY + 31);
}

// Update Pac-Man's position and draw it on the canvas
function updatePacman() {
    // Calculate new position based on current direction
    let newX = pacman.x;
    let newY = pacman.y;

    switch (pacman.direction) {
        case 'left':
            newX -= PACMAN_SPEED;
            break;
        case 'up':
            newY -= PACMAN_SPEED;
            break;
        case 'right':
            newX += PACMAN_SPEED;
            break;
        case 'down':
            newY += PACMAN_SPEED;
            break;
    }

    // Check if Pac-Man can continue in the current direction
    if (!isCollision(newX, newY)) {
        pacman.x = newX;
        pacman.y = newY;
    }

    // Calculate new position based on the next direction
    newX = pacman.x;
    newY = pacman.y;

    switch (pacman.nextDirection) {
        case 'left':
            newX -= PACMAN_SPEED;
            break;
        case 'up':
            newY -= PACMAN_SPEED;
            break;
        case 'right':
            newX += PACMAN_SPEED;
            break;
        case 'down':
            newY += PACMAN_SPEED;
            break;
    }

    // Check if Pac-Man can change to the next direction
    if (!isCollision(newX, newY)) {
        pacman.direction = pacman.nextDirection;
    }

    // Update the mouth angle smoothly based on elapsed time
    const currentTime = performance.now();
    const elapsedTime = currentTime - lastMouthUpdateTime;
    const angleRange = Math.PI;
    const animationTime = 1000;//1000 is 1 second

    pacman.mouthAngle = angleRange * (Math.sin((currentTime * 3 * Math.PI) / animationTime - Math.PI / 2) * 0.25 + 0.25);
    lastMouthUpdateTime = currentTime;

    // Draw Pac-Man on the canvas with the updated mouth angle
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(pacman.x + 16, pacman.y + 16, 16, (0.25 - pacman.mouthAngle / 4) * Math.PI, (1.75 + pacman.mouthAngle / 4) * Math.PI);
    ctx.lineTo(pacman.x + 16, pacman.y + 16);
    ctx.closePath();
    ctx.fill();

    // Check for collisions with ghosts
    for (let i = ghosts.length - 1; i >= 0; i--) {
        const ghost = ghosts[i];
        if (distance(pacman.x + 16, pacman.y + 16, ghost.x + 16, ghost.y + 16) < 32) {
            if (ghost.mode === 'frightened') {
                ghosts.splice(i, 1); // Remove the ghost from the array
                score += 200;
            } else {
                // Pac-Man has been caught
                console.log("Game over!");

                // Show the game over screen
                const gameOverContainer = document.getElementById("game-over-container");
                gameOverContainer.style.display = "block";

                // Pause for 5 seconds
                setTimeout(() => {
                    // Hide the game over screen
                    gameOverContainer.style.display = "none";

                    // Reset game state
                    resetGameState();
                }, 5000);
            }
        }
    }
}
