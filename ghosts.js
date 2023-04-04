const GHOST_SPEED = 2;
const ghostColors = ['red', 'pink', 'cyan', 'orange'];

// Constants for ghost drawing
const GHOST_RADIUS = 16;
const GHOST_EYE_RADIUS = 5.5;
const GHOST_PUPIL_RADIUS = 2.5;
const GHOST_EYE_X_OFFSET = 11;
const GHOST_EYE_Y_OFFSET = 12;
const GHOST_PUPIL_X_OFFSET = 11;
const GHOST_PUPIL_Y_OFFSET = 12;
const GHOST_EYE_DISTANCE = 15; // You can adjust this value to change the distance between the eyes

let ghosts = [];

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

        let bestDist = Infinity;
        let bestDirection = ghost.direction;

        if (dist > 0) {
            const possibleDirections = ['left', 'right', 'up', 'down'].filter(dir => {
                const oppositeDir = getOppositeDirection(ghost.direction);
                const newX = ghost.x + getDeltaX(dir) * GHOST_SPEED;
                const newY = ghost.y + getDeltaY(dir) * GHOST_SPEED;

                if (!isGhostCollision(newX, newY)) {
                    // Only allow to move in the opposite direction if it's a dead end
                    if (dir === oppositeDir) {
                        const otherDirections = ['left', 'right', 'up', 'down'].filter(d => d !== dir);
                        const canMoveOtherWays = otherDirections.some(d => !isGhostCollision(ghost.x + getDeltaX(d) * GHOST_SPEED, ghost.y + getDeltaY(d) * GHOST_SPEED));

                        return !canMoveOtherWays;
                    }
                    return true;
                }
                return false;
            });

            for (const dir of possibleDirections) {
                const testX = ghost.x + getDeltaX(dir) * GHOST_SPEED;
                const testY = ghost.y + getDeltaY(dir) * GHOST_SPEED;
                const testDist = Math.sqrt(Math.pow(testX - ghost.targetX, 2) + Math.pow(testY - ghost.targetY, 2));

                if (testDist < bestDist) {
                    bestDist = testDist;
                    bestDirection = dir;
                }
            }
        }

        ghost.direction = bestDirection;

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
        ctx.fillStyle = ghost.mode === 'frightened' ? 'rgb(0, 128, 255)' : ghost.color;

        // Draw the ghost's body
        ctx.beginPath();
        ctx.arc(ghost.x + GHOST_RADIUS, ghost.y + GHOST_RADIUS, GHOST_RADIUS, Math.PI, 0, false);
        ctx.lineTo(ghost.x + 32, ghost.y + 32);
        ctx.lineTo(ghost.x + 28, ghost.y + 24);
        ctx.lineTo(ghost.x + 24, ghost.y + 32);
        ctx.lineTo(ghost.x + 20, ghost.y + 24);
        ctx.lineTo(ghost.x + 16, ghost.y + 32);
        ctx.lineTo(ghost.x + 12, ghost.y + 24);
        ctx.lineTo(ghost.x + 8, ghost.y + 32);
        ctx.lineTo(ghost.x + 4, ghost.y + 24);
        ctx.lineTo(ghost.x, ghost.y + 32);
        ctx.closePath();
        ctx.fill();

        // Draw the ghost's eyes
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(ghost.x + GHOST_RADIUS - GHOST_EYE_DISTANCE / 2, ghost.y + GHOST_EYE_Y_OFFSET, GHOST_EYE_RADIUS, 0, 2 * Math.PI);
        ctx.arc(ghost.x + GHOST_RADIUS + GHOST_EYE_DISTANCE / 2, ghost.y + GHOST_EYE_Y_OFFSET, GHOST_EYE_RADIUS, 0, 2 * Math.PI);
        ctx.fill();

        // Draw the ghost's pupils
        ctx.fillStyle = 'blue';
        ctx.beginPath();
        ctx.arc(ghost.x + GHOST_RADIUS - GHOST_EYE_DISTANCE / 2, ghost.y + GHOST_PUPIL_Y_OFFSET, GHOST_PUPIL_RADIUS, 0, 2 * Math.PI);
        ctx.arc(ghost.x + GHOST_RADIUS + GHOST_EYE_DISTANCE / 2, ghost.y + GHOST_PUPIL_Y_OFFSET, GHOST_PUPIL_RADIUS, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function getOppositeDirection(direction) {
    switch (direction) {
        case 'left':
            return 'right';
        case 'right':
            return 'left';
        case 'up':
            return 'down';
        case 'down':
            return 'up';
    }
}

// Helper function to get the movement direction from a velocity vector
function getDirection(vx, vy) {
    if (vx < 0 && Math.abs(vx) > Math.abs(vy)) return 'left';
    if (vx > 0 && Math.abs(vx) > Math.abs(vy)) return 'right';
    if (vy < 0 && Math.abs(vy) > Math.abs(vx)) return 'up';
    if (vy > 0 && Math.abs(vy) > Math.abs(vx)) return 'down';
}
