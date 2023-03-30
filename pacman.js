const PACMAN_SPEED = 2;
let pacmanStartPosition = getRandomOpenPosition();
let pacman = { x: pacmanStartPosition.x, y: pacmanStartPosition.y, direction: 'right' };

// Handle keyboard events to move Pac-Man
document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
        case 37: // left arrow
            pacman.direction = 'left';
            break;
        case 38: // up arrow
            pacman.direction = 'up';
            break;
        case 39: // right arrow
            pacman.direction = 'right';
            break;
        case 40: // down arrow
            pacman.direction = 'down';
            break;
    }
});

function isWall(x, y) {
    // Check if the given position is inside the canvas and if it's a wall in the maze
    return x >= 0 && y >= 0 && x <= canvas.width - 32 && y <= canvas.height - 32 && maze[Math.floor(x / 32)][Math.floor(y / 32)];
}

function isCollision(newX, newY) {
    // Check for collision in all four corners of the Pac-Man sprite
    return isWall(newX, newY) || isWall(newX + 31, newY) || isWall(newX, newY + 31) || isWall(newX + 31, newY + 31);
}

// Update Pac-Man's position and draw it on the canvas
function updatePacman() {
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

    // Check if the new position is within the maze boundaries and not in a wall
    if (!isCollision(newX, newY)) {
        pacman.x = newX;
        pacman.y = newY;
    }

    // Draw Pac-Man on the canvas
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(pacman.x + 16, pacman.y + 16, 16, 0.25 * Math.PI, 1.75 * Math.PI);
    ctx.lineTo(pacman.x + 16, pacman.y + 16);
    ctx.closePath();
    ctx.fill();

    // Check for collisions with ghosts
    for (let ghost of ghosts) {
        if (distance(pacman.x + 16, pacman.y + 16, ghost.x + 16, ghost.y + 16) < 32) {
            if (ghost.mode === 'frightened') {
                ghost.x = 2 * 64;
                ghost.y = 3 * 64;
                score += 200;
            } else {
                // Pac-Man has been caught
                console.log("Game over!");
                // Add game over logic here, such as resetting the game state or showing a game over screen
            }
        }
    }
}
