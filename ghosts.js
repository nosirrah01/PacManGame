const GHOST_SPEED = 2;
const ghostColors = ['red', 'pink', 'cyan', 'orange'];
let ghosts = [];

function isWall(x, y) {
    // Check if the given position is inside the canvas
    if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) {
        return true;
    }

    // Check if it's a wall in the maze
    return maze[Math.floor(x / 32)][Math.floor(y / 32)];
}

function isGhostCollision(newX, newY) {
    // Check for collision in all four corners of the ghost sprite
    return isWall(newX, newY) || isWall(newX + 31, newY) || isWall(newX, newY + 31) || isWall(newX + 31, newY + 31);
}

function getDeltaX(direction) {
    if (direction === 'left') return -1;
    if (direction === 'right') return 1;
    return 0;
}

function getDeltaY(direction) {
    if (direction === 'up') return -1;
    if (direction === 'down') return 1;
    return 0;
}

// Create the ghosts and their movement patterns
function createGhosts() {
    for (let i = 0; i < ghostColors.length; i++) {
        let startPosition = getRandomOpenPosition();
        ghosts.push({
            x: startPosition.x,
            y: startPosition.y,
            color: ghostColors[i],
            targetX: null,
            targetY: null,
            direction: 'left',
            mode: 'scatter',
            scaredTimer: 0,
        });
    }
}

// Update the ghosts' position and draw them on the canvas
function updateGhosts() {
    for (let ghost of ghosts) {
        // Choose the ghost's target tile based on its mode
        if (ghost.mode === 'scatter') {
            ghost.targetX = Math.floor(Math.random() * WIDTH) * 32;
            ghost.targetY = Math.floor(Math.random() * HEIGHT) * 32;
        } else if (ghost.mode === 'chase') {
            switch (ghost.color) {
                case 'red': // Blinky
                    ghost.targetX = pacman.x;
                    ghost.targetY = pacman.y;
                    break;
                case 'pink': // Pinky
                    ghost.targetX = pacman.x + getDeltaX(pacman.direction) * 4 * 32;
                    ghost.targetY = pacman.y + getDeltaY(pacman.direction) * 4 * 32;
                    break;
                case 'cyan': // Inky
                    // Find Blinky's position
                    let blinky = ghosts.find(g => g.color === 'red');
                    let midX = pacman.x + getDeltaX(pacman.direction) * 2 * 32;
                    let midY = pacman.y + getDeltaY(pacman.direction) * 2 * 32;
                    ghost.targetX = blinky.x + 2 * (midX - blinky.x);
                    ghost.targetY = blinky.y + 2 * (midY - blinky.y);
                    break;
                case 'orange': // Clyde
                    let dist = distance(pacman.x, pacman.y, ghost.x, ghost.y);
                    if (dist > 8 * 32) {
                        ghost.targetX = pacman.x;
                        ghost.targetY = pacman.y;
                    } else {
                        ghost.targetX = 0;
                        ghost.targetY = HEIGHT * 32 - 32;
                    }
                    break;
            }
        } else {
            // Implement other modes, such as chase or frightened
        }

        // Calculate the ghost's movement direction
        const dx = ghost.targetX - ghost.x;
        const dy = ghost.targetY - ghost.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 0) {
            const vx = dx / dist;
            const vy = dy / dist;
            ghost.direction = getDirection(vx, vy);
        }

        // Calculate new position based on ghost's direction and speed
        let newX = ghost.x;
        let newY = ghost.y;

        switch (ghost.direction) {
            case 'left':
                newX -= GHOST_SPEED;
                break;
            case 'up':
                newY -= GHOST_SPEED;
                break;
            case 'right':
                newX += GHOST_SPEED;
                break;
            case 'down':
                newY += GHOST_SPEED;
                break;
        }

        // Check if the ghost can continue in the current direction
        if (!isGhostCollision(newX, newY)) {
            ghost.x = newX;
            ghost.y = newY;
        }

        // Draw the ghost on the canvas
        ctx.fillStyle = ghost.color;
        ctx.beginPath();
        ctx.arc(ghost.x + 16, ghost.y + 16, 16, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
}

// Helper function to get the movement direction from a velocity vector
function getDirection(vx, vy) {
    if (vx < 0 && Math.abs(vx) > Math.abs(vy)) return 'left';
    if (vx > 0 && Math.abs(vx) > Math.abs(vy)) return 'right';
    if (vy < 0 && Math.abs(vy) > Math.abs(vx)) return 'up';
    if (vy > 0 && Math.abs(vy) > Math.abs(vx)) return 'down';
}
